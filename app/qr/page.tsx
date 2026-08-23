"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRGenerator() {
  const [businessId, setBusinessId] = useState("");

  const revtapUrl = businessId
    ? `${window.location.origin}/r/${businessId}`
    : "";

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-2">
          REV<span className="text-blue-500">tap</span>
        </h1>

        <p className="text-slate-400 mb-8">
          QR Code Generator
        </p>

        <div className="bg-white text-slate-900 rounded-2xl p-6">
          <label className="block font-semibold mb-2">
            Business ID
          </label>

          <input
            type="text"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            placeholder="e.g. hotel-jyoti"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-6 outline-none"
          />

          {businessId ? (
            <div className="flex flex-col items-center">
              <QRCodeSVG
                value={revtapUrl}
                size={260}
                level="H"
              />

              <p className="text-sm text-slate-500 mt-4 break-all text-center">
                {revtapUrl}
              </p>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-12">
              Enter a business ID to generate the QR code.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}