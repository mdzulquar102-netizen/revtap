import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;

  const { data: business, error } = await supabase
    .from("businesses")
    .select("id, name, review_url, active")
    .eq("id", businessId)
    .eq("active", true)
    .single();

  if (error || !business) {
    return new NextResponse("RevTap link not found", {
      status: 404,
    });
  }

  return NextResponse.redirect(business.review_url);
}