import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const full_name = formData.get("full_name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || null;
  const category = formData.get("category")?.toString();
  const seniority = formData.get("seniority")?.toString();
  const linkedin_url = formData.get("linkedin_url")?.toString().trim() || null;
  const portfolio_url = formData.get("portfolio_url")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim() || null;
  const cv = formData.get("cv") as File | null;

  if (!full_name || !email || !category || !seniority || !cv) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(cv.type)) {
    return NextResponse.json({ error: "El CV debe ser PDF o Word (.pdf, .doc, .docx)" }, { status: 400 });
  }
  if (cv.size > MAX_SIZE) {
    return NextResponse.json({ error: "El archivo no puede superar 5MB" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const ext = cv.name.split(".").pop();
  const path = `${slugify(full_name)}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("cvs")
    .upload(path, cv, { contentType: cv.type });

  if (uploadError) {
    return NextResponse.json({ error: "Error al subir el CV" }, { status: 500 });
  }

  const { error: insertError } = await supabase.from("candidates").insert({
    full_name,
    email,
    phone,
    category,
    seniority,
    linkedin_url,
    portfolio_url,
    message,
    cv_url: path,
  });

  if (insertError) {
    return NextResponse.json({ error: "Error al guardar tu postulación" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
