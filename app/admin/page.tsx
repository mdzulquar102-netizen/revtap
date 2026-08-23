"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type Business = {
  id: string;
  name: string;
  reviewUrl: string;
  active: boolean;
};

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [message, setMessage] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(true);

  async function loadBusinesses() {
    try {
      const response = await fetch("/api/businesses");
      const data = await response.json();

      if (response.ok) {
        setBusinesses(data);
      }
    } catch {
      console.error("Could not load businesses");
    }
  }

  async function loadOrders() {
    try {
      setOrdersLoading(true);

      const response = await fetch("/api/orders/admin");

      if (!response.ok) {
        console.error("Could not load orders");
        return;
      }

      const data = await response.json();
      setOrders(data);
    } catch {
      console.error("Could not load orders");
    } finally {
      setOrdersLoading(false);
    }
  }

  useEffect(() => {
    loadBusinesses();
    loadOrders();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const name = businessName.trim();
    const id = businessId.trim();
    const url = reviewUrl.trim();

    if (!name || !id || !url) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          id,
          reviewUrl: url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setMessage("Business created successfully!");

      setBusinessName("");
      setBusinessId("");
      setReviewUrl("");

      await loadBusinesses();
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the RevTap server.");
    }
  }

  async function updateOrderStatus(orderId: string, status: string) {
    try {
      const response = await fetch("/api/orders/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status,
        }),
      });

      if (!response.ok) {
        alert("Could not update order status.");
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch {
      alert("Could not connect to server.");
    }
  }

  function downloadQR(businessId: string) {
    const svg = document.getElementById(`qr-${businessId}`);

    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return;

    const size = 1600;

    canvas.width = size;
    canvas.height = size;

    const image = new Image();

    image.onload = () => {
      context.fillStyle = "white";
      context.fillRect(0, 0, size, size);

      context.drawImage(image, 0, 0, size, size);

      const link = document.createElement("a");

      link.download = `${businessId}-revtap-qr.png`;
      link.href = canvas.toDataURL("image/png");

      link.click();
    };

    image.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svgString);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-5xl mx-auto pt-10">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-5">
            <div>
              <h1 className="text-5xl font-black tracking-tight">
                REV<span className="text-blue-600">tap</span>
              </h1>

              <p className="text-slate-500 mt-2">
                Business Administration
              </p>
            </div>

            <a
              href="/"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-600 transition"
            >
              View Website
            </a>
          </div>
        </div>

        {/* ADD BUSINESS */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl mb-12"
        >
          <h2 className="text-2xl font-bold mb-2">
            Add Business
          </h2>

          <p className="text-slate-500 mb-7">
            Create a QR code that sends customers directly to Google Reviews.
          </p>

          <label className="block font-semibold mb-2">
            Business Name
          </label>

          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Hotel Jyoti International"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block font-semibold mb-2">
            Business ID
          </label>

          <input
            type="text"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            placeholder="hotel-jyoti"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block font-semibold mb-2">
            Google Review URL
          </label>

          <input
            type="text"
            value={reviewUrl}
            onChange={(e) => setReviewUrl(e.target.value)}
            placeholder="https://g.page/r/XXXXXXXXXXXX/review"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 transition"
          >
            Create Business
          </button>

          {message && (
            <p className="mt-5 text-center font-semibold">
              {message}
            </p>
          )}
        </form>

        {/* BUSINESSES */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-5">
            Your Businesses
          </h2>

          <div className="space-y-5">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold">
                      {business.name}
                    </h3>

                    <p className="text-slate-500 mt-1">
                      ID: {business.id}
                    </p>

                    <p className="text-blue-600 mt-3 break-all text-sm">
                      Google Review:
                      <br />
                      {business.reviewUrl}
                    </p>
                  </div>

                  {/* QR CODE */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm shrink-0">
                    <QRCodeSVG
                      id={`qr-${business.id}`}
                      value={business.reviewUrl}
                      size={240}
                      level="H"
                      includeMargin
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {/* DIRECT GOOGLE REVIEW TEST */}
                  <a
                    href={business.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                  >
                    Test Google Review
                  </a>

                  {/* DOWNLOAD QR */}
                  <button
                    type="button"
                    onClick={() => downloadQR(business.id)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                  >
                    Download QR
                  </button>
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-blue-900">
                    QR destination
                  </p>

                  <p className="text-sm text-blue-700 break-all mt-1">
                    {business.reviewUrl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ORDERS */}
        <section>
          <div className="flex items-center justify-between mb-5 gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                Customer Orders
              </h2>

              <p className="text-slate-500 mt-1">
                Simple direct orders from your website.
              </p>
            </div>

            <button
              type="button"
              onClick={loadOrders}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold"
            >
              Refresh
            </button>
          </div>

          {ordersLoading ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
              No orders yet.
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <div>
                      <p className="text-sm text-slate-400">
                        Order #{order.id}
                      </p>

                      <h3 className="text-xl font-bold mt-1">
                        {order.customer_name}
                      </h3>
                    </div>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="border border-slate-300 rounded-xl px-4 py-2 font-semibold"
                    >
                      <option value="New">New</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-sm text-slate-500">
                        Product
                      </p>

                      <p className="font-bold">
                        {order.product_name}
                      </p>

                      <p className="text-slate-600">
                        Quantity: {order.quantity}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-sm text-slate-500">
                        Total
                      </p>

                      <p className="text-2xl font-bold text-blue-600">
                        ₹{order.total_amount}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-sm text-slate-500">
                        Phone
                      </p>

                      <a
                        href={`tel:${order.phone}`}
                        className="font-bold text-blue-600"
                      >
                        {order.phone}
                      </a>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-sm text-slate-500">
                        Order Date
                      </p>

                      <p className="font-semibold">
                        {new Date(
                          order.created_at
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 mt-4">
                    <p className="text-sm text-slate-500">
                      Delivery Address
                    </p>

                    <p className="font-semibold">
                      {order.address}
                    </p>

                    <p className="text-slate-600">
                      {order.city} - {order.pincode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}