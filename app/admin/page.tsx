"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type Business = {
  id: string;
  name: string;
  reviewUrl: string;
  active: boolean;
};

export default function AdminPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [message, setMessage] = useState("");

  async function loadBusinesses() {
    const response = await fetch("/api/businesses");
    const data = await response.json();

    if (response.ok) {
      setBusinesses(data);
    }
  }

  useEffect(() => {
    loadBusinesses();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: businessName,
          id: businessId,
          reviewUrl,
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
    } catch {
      setMessage("Could not connect to the RevTap server.");
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

  const size = 1200;
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
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto pt-12">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            REV<span className="text-blue-500">tap</span>
          </h1>

          <p className="text-slate-400 mt-2">
            Business Administration
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-slate-900 rounded-2xl p-8 shadow-xl mb-10"
        >
          <h2 className="text-2xl font-bold mb-6">
            Add Business
          </h2>

          <label className="block font-semibold mb-2">
            Business Name
          </label>

          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Hotel Jyoti International"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-6"
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
            className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-6"
            required
          />

          <label className="block font-semibold mb-2">
            Google Review URL
          </label>

          <input
            type="url"
            value={reviewUrl}
            onChange={(e) => setReviewUrl(e.target.value)}
            placeholder="https://..."
            className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-6"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3"
          >
            Create Business
          </button>

          {message && (
            <p className="mt-5 text-center font-medium">
              {message}
            </p>
          )}
        </form>

        <section>
          <h2 className="text-2xl font-bold mb-5">
            Your Businesses
          </h2>

          <div className="space-y-4">
            {businesses.map((business) => (
              <div
  key={business.id}
  className="bg-slate-900 border border-slate-800 rounded-xl p-5"
>
  <h3 className="text-xl font-semibold">
    {business.name}
  </h3>

  <p className="text-slate-400 mt-1">
    ID: {business.id}
  </p>

  <p className="text-blue-400 mt-2 break-all">
    http://localhost:3000/r/{business.id}
  </p>

  <div className="mt-5 bg-white rounded-xl p-5 w-fit">
    <QRCodeSVG
  id={`qr-${business.id}`}
  value={`http://localhost:3000/r/${business.id}`}
  size={220}
  level="H"
/>
  </div>

  <div className="mt-5 flex gap-3">
    <a
      href={`/r/${business.id}`}
      target="_blank"
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
    >
      Test Link
      <button
  type="button"
  onClick={() => downloadQR(business.id)}
  className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium"
>
  Download QR
</button>
    </a>
  </div>
</div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}