import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/supabase/server";

const pvcOrderSchema = z.object({
  cardType: z.enum(["aadhaar", "pan", "rc", "dl", "id"]),
  deliveryMode: z.enum(["manual", "google"]),
  customer: z.object({
    name: z.string().min(2),
    mobileNumber: z.string().min(10),
    whatsappNumber: z.string().min(10),
    address: z.string().min(8),
    alternatePhoneNumber: z.string().min(10).optional().or(z.literal("")),
  }),
  googleUser: z
    .object({
      uid: z.string().min(1),
      email: z.string().email().optional().or(z.literal("")),
      displayName: z.string().optional().or(z.literal("")),
      phoneNumber: z.string().optional().or(z.literal("")),
    })
    .optional(),
  photoUploaded: z.boolean(),
  documentUploaded: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const { client: supabaseServer, error: supabaseConfigError } = getSupabaseServer();
    if (!supabaseServer) {
      return NextResponse.json(
        { error: supabaseConfigError ?? "Supabase server client not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const parsed = pvcOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { cardType, deliveryMode, customer, googleUser, photoUploaded, documentUploaded } = parsed.data;
    const now = new Date().toISOString();

    const profilePayload = {
      full_name: customer.name,
      mobile_number: customer.mobileNumber,
      whatsapp_number: customer.whatsappNumber,
      address: customer.address,
      alternate_phone_number: customer.alternatePhoneNumber || null,
      google_uid: googleUser?.uid ?? null,
      email: googleUser?.email || null,
      updated_at: now,
    };

    const { data: profileData, error: profileError } = await supabaseServer
      .from("customer_profiles")
      .upsert(profilePayload, { onConflict: "mobile_number" })
      .select("id")
      .single();

    if (profileError) {
      console.error("Supabase profile upsert error:", profileError);
      const reason =
        profileError.code === "42P01"
          ? "Missing table: customer_profiles. Run the Supabase schema SQL first."
          : profileError.code === "42501"
            ? "Permission denied by RLS/policies for customer_profiles insert/upsert."
            : profileError.message;
      return NextResponse.json(
        {
          error: "Failed to save customer profile",
          details: reason,
          code: profileError.code ?? null,
        },
        { status: 500 }
      );
    }

    const orderPayload = {
      customer_id: profileData.id,
      card_type: cardType,
      delivery_mode: deliveryMode,
      order_status: "submitted",
      payment_status: "pending",
      photo_uploaded: photoUploaded,
      document_uploaded: documentUploaded,
      created_at: now,
      updated_at: now,
    };

    const { data: orderData, error: orderError } = await supabaseServer
      .from("pvc_orders")
      .insert(orderPayload)
      .select("id")
      .single();

    if (orderError) {
      console.error("Supabase order insert error:", orderError);
      const reason =
        orderError.code === "42P01"
          ? "Missing table: pvc_orders. Run the Supabase schema SQL first."
          : orderError.code === "42501"
            ? "Permission denied by RLS/policies for pvc_orders insert."
            : orderError.message;
      return NextResponse.json(
        {
          error: "Failed to save PVC order",
          details: reason,
          code: orderError.code ?? null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      orderId: orderData.id,
      orderStatus: "submitted",
      paymentStatus: "pending",
    });
  } catch (error) {
    console.error("PVC order API error:", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
