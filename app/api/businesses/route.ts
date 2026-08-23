import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("businesses")
      .select("id, name, review_url, active")
      .order("name", { ascending: true });

    if (error) {
      console.error("Supabase businesses GET error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const businesses = (data || []).map((business) => ({
      id: business.id,
      name: business.name,
      reviewUrl: business.review_url,
      active: business.active,
    }));

    return NextResponse.json(businesses);
  } catch (error) {
    console.error("Businesses GET error:", error);

    return NextResponse.json(
      { error: "Could not load businesses." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const id =
      typeof body.id === "string" ? body.id.trim() : "";

    const reviewUrl =
      typeof body.reviewUrl === "string"
        ? body.reviewUrl.trim()
        : "";

    if (!name || !id || !reviewUrl) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!/^https?:\/\//i.test(reviewUrl)) {
      return NextResponse.json(
        { error: "Please enter a valid review URL." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("businesses")
      .insert({
        id,
        name,
        review_url: reviewUrl,
        active: true,
      })
      .select("id, name, review_url, active")
      .single();

    if (error) {
      console.error("Supabase business POST error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        business: {
          id: data.id,
          name: data.name,
          reviewUrl: data.review_url,
          active: data.active,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Business API error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const id =
      typeof body.id === "string" ? body.id.trim() : "";

    const reviewUrl =
      typeof body.reviewUrl === "string"
        ? body.reviewUrl.trim()
        : "";

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : undefined;

    if (!id) {
      return NextResponse.json(
        { error: "Business ID is required." },
        { status: 400 }
      );
    }

    if (!reviewUrl || !/^https?:\/\//i.test(reviewUrl)) {
      return NextResponse.json(
        { error: "Please enter a valid review URL." },
        { status: 400 }
      );
    }

    const updateData: {
      review_url: string;
      name?: string;
    } = {
      review_url: reviewUrl,
    };

    if (name) {
      updateData.name = name;
    }

    const { data, error } = await supabase
      .from("businesses")
      .update(updateData)
      .eq("id", id)
      .select("id, name, review_url, active")
      .single();

    if (error) {
      console.error("Supabase business PATCH error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      business: {
        id: data.id,
        name: data.name,
        reviewUrl: data.review_url,
        active: data.active,
      },
    });
  } catch (error) {
    console.error("Business PATCH error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}