import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin"; 

export async function GET() {
  const { data, error } = await supabase
    .from("businesses")
    .select("id, name, review_url, active, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase GET error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  try {
    const supabaseServer = await createClient();

    const {
      data: { user },
    } = await supabaseServer.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = body.id?.trim();
    const name = body.name?.trim();
    const reviewUrl = body.reviewUrl?.trim();

    if (!id || !name || !reviewUrl) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

const { data, error } = await supabaseAdmin
  .from("businesses")
  .insert({
        
        id,
        name,
        review_url: reviewUrl,
        active: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase POST error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        business: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);

    return NextResponse.json(
      { error: "Could not create business." },
      { status: 500 }
    );
  }
}