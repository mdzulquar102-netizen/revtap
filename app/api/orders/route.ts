import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      phone,
      address,
      city,
      pincode,
      productName,
      quantity,
      totalAmount,
    } = body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !pincode ||
      !productName ||
      !quantity ||
      totalAmount === undefined
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName,
        phone,
        address,
        city,
        pincode,
        product_name: productName,
        quantity: quantity,
        total_amount: totalAmount,
      });

    if (error) {
      console.error("Supabase order error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order API error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}