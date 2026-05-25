"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const WA_LINK = "https://wa.me/6282230261340";

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#d1e9e1",
  inputBg: "#e6f0e7",
  titleColor: "#1f422e",
  dividerColor: "#7aa259",
  labelColor: "#1f422e",
  btnWaStroke: "#b5dbce",
  btnSubmit: "#58726a",
};

/* ------------------------------------------------------------------ */
/*  RfqPage                                                            */
/* ------------------------------------------------------------------ */

export default function RfqPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    requesterName: "",
    email: "",
    phone: "",
    product: "",
    saveInfo: false,
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, saveInfo: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "companyName",
      "companyAddress",
      "requesterName",
      "email",
      "phone",
      "product",
    ];
    const newErrors: Record<string, boolean> = {};
    let hasError = false;
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData].toString().trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    }
    setErrors(newErrors);
    if (hasError) return;

    /* TODO: submit RFQ to system — wait for user instruction */
  };

  const inputBase: React.CSSProperties = {
    backgroundColor: C.inputBg,
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "var(--font-jakarta), sans-serif",
    color: "#333",
    width: "100%",
    padding: "10px 14px",
    outline: "none",
    transition: "box-shadow 0.2s, border 0.2s",
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    border: errors[field] ? "1.5px solid #e74c3c" : "none",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 600,
    color: C.labelColor,
    fontFamily: "var(--font-jakarta), sans-serif",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: C.bg }}>
      <div className="pt-28 md:pt-32">
      <section
        className="relative w-full py-16 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-left mb-8 md:mb-10">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight"
              style={{ fontSize: "36px", color: C.titleColor }}
            >
              Form RFQ
            </h2>
            <p
              className="mt-1 font-[family-name:var(--font-jakarta)]"
              style={{ fontSize: "14px", color: "#555" }}
            >
              (Request for Quotation)
            </p>
            <div
              className="mt-4"
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: C.dividerColor,
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4">
              <div>
                <label style={labelStyle}>Nama Perusahaan</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Masukkan nama perusahaan"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={inputStyle("companyName")}
                />
              </div>
              <div>
                <label style={labelStyle}>Alamat Perusahaan</label>
                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Masukkan alamat perusahaan"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  style={inputStyle("companyAddress")}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="mb-4">
              <label style={labelStyle}>Nama Peminta RFQ</label>
              <input
                type="text"
                name="requesterName"
                placeholder="Masukkan nama lengkap"
                value={formData.requesterName}
                onChange={handleChange}
                style={inputStyle("requesterName")}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4">
              <div>
                <label style={labelStyle}>Email Perusahaan</label>
                <input
                  type="email"
                  name="email"
                  placeholder="contoh@perusahaan.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle("email")}
                />
              </div>
              <div>
                <label style={labelStyle}>Nomor Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Masukkan nomor telepon"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle("phone")}
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="mb-5">
              <label style={labelStyle}>Pilih Produk</label>
              <button
                type="button"
                className="w-full flex items-center justify-between cursor-pointer"
                style={{
                  ...inputStyle("product"),
                  cursor: "pointer",
                  color: formData.product ? "#333" : "#999",
                }}
                onClick={() => {
                  /* TODO: navigate to product page for selection — wait for user instruction */
                }}
              >
                <span>{formData.product || "Pilih produk yang diminta"}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ flexShrink: 0, marginLeft: "8px" }}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Row 5 */}
            <div className="flex items-center gap-2.5 mb-6">
              <input
                type="checkbox"
                id="saveInfoPage"
                checked={formData.saveInfo}
                onChange={handleCheckbox}
                className="w-4 h-4 cursor-pointer accent-[#7aa259]"
              />
              <label
                htmlFor="saveInfoPage"
                className="font-[family-name:var(--font-jakarta)] cursor-pointer"
                style={{ fontSize: "13px", color: "#555" }}
              >
                Simpan informasi saya untuk pengisian RFQ berikutnya
              </label>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-[family-name:var(--font-jakarta)] font-semibold transition-all duration-200 cursor-pointer no-underline"
                style={{
                  fontSize: "14px",
                  color: "#1f422e",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  border: `3.4px solid ${C.btnWaStroke}`,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = C.btnWaStroke;
                  el.style.color = "#1f422e";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = "transparent";
                  el.style.color = "#1f422e";
                }}
              >
                <MessageCircle width={16} height={16} strokeWidth={2} />
                Contact Us
              </a>

              <button
                type="submit"
                className="flex items-center justify-center font-[family-name:var(--font-jakarta)] font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: C.btnSubmit,
                }}
              >
                Kirim RFQ
              </button>
            </div>
          </form>
        </div>
      </section>
      </div>
    </main>
  );
}
