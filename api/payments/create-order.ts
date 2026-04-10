import { Router } from 'express';
import Razorpay from "razorpay";
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
