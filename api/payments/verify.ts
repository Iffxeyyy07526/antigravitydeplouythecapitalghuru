import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

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
    // Note: We need the secret for signature verification, but we don't necessarily need the full Razorpay SDK instance here if we just use crypto.
    // However, for consistency we use the same environment variables.
    return {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    };
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rzp = getRazorpay();
    const sbAdmin = getSupabaseAdmin();
    const rsnd = getResend();

    if (!rzp.key_secret || !sbAdmin) {
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
      .createHmac("sha256", rzp.key_secret || "")
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
}
