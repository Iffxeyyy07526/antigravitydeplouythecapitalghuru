import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Lazy initialization helpers to prevent startup crashes
let supabaseAdmin: any = null;
const getSupabaseAdmin = () => {
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error("CRITICAL: Supabase environment variables missing");
      return null;
    }
    supabaseAdmin = createClient(url, key);
  }
  return supabaseAdmin;
};

let razorpay: any = null;
const getRazorpay = () => {
  if (!razorpay) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      console.error("CRITICAL: Razorpay environment variables missing");
      return null;
    }
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpay;
};

let resend: any = null;
const getResend = () => {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error("CRITICAL: Resend API key missing");
      return null;
    }
    resend = new Resend(key);
  }
  return resend;
};

app.use(express.json());

// API Routes
app.post("/api/payments/create-order", async (req, res) => {
  try {
    const rzp = getRazorpay();
    if (!rzp) return res.status(500).json({ error: "Razorpay not configured" });

    const { amount, plan } = req.body;
    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { plan },
    };

    const order = await rzp.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/api/payments/verify", async (req, res) => {
  try {
    const rzp = getRazorpay();
    const sbAdmin = getSupabaseAdmin();
    const rsnd = getResend();

    if (!rzp || !sbAdmin) {
      return res.status(500).json({ error: "Server configuration missing" });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      plan,
      email,
      fullName
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // 1. Store payment in DB
      const { error: paymentError } = await sbAdmin.from("payments").insert({
        user_id: userId,
        amount: plan === "monthly" ? 2499 : plan === "six_month" ? 11999 : 19999,
        plan,
        payment_id: razorpay_payment_id,
        status: "success",
      });

      if (paymentError) throw paymentError;

      // 2. Create/Update subscription
      const durationDays = plan === "monthly" ? 30 : plan === "six_month" ? 180 : 365;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + durationDays);

      const { error: subError } = await sbAdmin.from("subscriptions").upsert({
        user_id: userId,
        plan,
        status: "active",
        started_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      }, { onConflict: 'user_id' });

      if (subError) throw subError;

      // 3. Send email via Resend
      if (rsnd) {
        try {
          await rsnd.emails.send({
            from: "Mahir@thecapitalguru.net",
            to: email,
            subject: "Your VIP Access – The Capital Guru",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff; border-radius: 8px;">
                <h1 style="color: #00ffcc;">Welcome to VIP, ${fullName}!</h1>
                <p>Your subscription to The Capital Guru is now active.</p>
                <p>Plan: <strong>${plan.replace('_', ' ').toUpperCase()}</strong></p>
                <p>Expiry: ${expiresAt.toLocaleDateString()}</p>
                <div style="margin-top: 30px;">
                  <a href="https://t.me/TheCapitalGuruSupport" style="background-color: #00ffcc; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Join Telegram Now</a>
                </div>
                <p style="margin-top: 30px; font-size: 12px; color: #666;">If you have any issues, please contact support.</p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error("Email sending error:", emailError);
        }
      }

      res.json({ status: "ok" });
    } else {
      res.status(400).json({ error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
