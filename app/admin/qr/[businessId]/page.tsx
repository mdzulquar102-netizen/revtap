"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Business = {
  id: string;
  name: string;
  review_url: string;
  active: boolean;
};

export default function QRPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const { businessId } = await params;

        const response = await fetch("/api/businesses");

        if (!response.ok) {
          throw new Error("Could not load businesses");
        }

        const businesses: Business[] = await response.json();

        const found = businesses.find(
          (item) => item.id === businessId
        );

        if (!found) {
          setError("Business not found");
          return;
        }

        setBusiness(found);
      } catch {
        setError("Could not load business");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params]);

  function downloadQR() {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas || !business) return;

    const link = document.createElement("a");

    link.download = `${business.id}-revtap-qr.png`;
    link.href = canvas.toDataURL("image/png");

    link.click();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (error || !business) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>{error || "Business not found"}</p>
      </main>
    );
  }

  const revtapUrl =
    `${process.env.NEXT_PUBLIC_REVTAP_URL}/r/${business.id}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          RevTap QR
        </h1>

        <p className="text-slate-400 mb-8">
          {business.name}
        </p>

        <div className="bg-white rounded-2xl p-8 text-slate-900 text-center">

          <div
            ref={qrRef}
            className="flex justify-center mb-6"
          >
            <QRCodeCanvas
              value={revtapUrl}
              size={300}
              level="H"
              includeMargin={true}
            />
          </div>

          <h2 className="text-xl font-bold mb-2">
            Scan to Review
          </h2>

          <p className="text-sm text-slate-500 break-all mb-6">
            {revtapUrl}
          </p>

          <button
            onClick={downloadQR}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Download QR PNG
          </button>

        </div>
      </div>
    </main>
  );
}