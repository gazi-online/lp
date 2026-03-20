import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/supabase/server";

const statusSchema = z.object({
  orderStatus: z.enum(["submitted", "processing", "approved", "rejected", "completed"]).optional(),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const adminToken = req.headers.get("x-admin-token");
  const expectedAdminToken = process.env.ADMIN_API_TOKEN;

  if (!expectedAdminToken) {
    return NextResponse.json(
      { error: "ADMIN_API_TOKEN is not configured on server" },
      { status: 500 }
    );
  }

  if (!adminToken || adminToken !== expectedAdminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { client: supabaseServer, error: supabaseConfigError } = getSupabaseServer();
  if (!supabaseServer) {
    return NextResponse.json(
      { error: supabaseConfigError ?? "Supabase server client not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!parsed.data.orderStatus && !parsed.data.paymentStatus) {
    return NextResponse.json(
      { error: "Provide at least one of orderStatus or paymentStatus" },
      { status: 400 }
    );
  }

  const { id } = await params;
  const updatePayload = {
    ...(parsed.data.orderStatus ? { order_status: parsed.data.orderStatus } : {}),
    ...(parsed.data.paymentStatus ? { payment_status: parsed.data.paymentStatus } : {}),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseServer
    .from("pvc_orders")
    .update(updatePayload)
    .eq("id", id)
    .select("id, order_status, payment_status, updated_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update status", details: error.message, code: error.code ?? null },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, data });
}

