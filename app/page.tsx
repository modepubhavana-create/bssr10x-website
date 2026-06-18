"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const problems = [
  "Poor mobile experience",
  "Weak call-to-action",
  "Old design",
  "Missing booking/contact flow",
  "Slow loading pages",
  "No trust signals or reviews",
];

const solutions = [
  "Mobile-first redesign",
  "Contact and booking buttons",
  "Google Maps integration",
  "Service/menu page cleanup",
  "Basic SEO setup",
  "Lead capture forms",
];

const packages = [
  {
    name: "Starter Website",
    price: "$299",
    description:
      "One-page website, mobile responsive, contact form, Google Maps, basic SEO.",
  },
  {
    name: "Business Website",
    price: "$599",
    description:
      "5-page website: Home, About, Services/Menu, Gallery/Reviews, Contact.",
  },
  {
    name: "Premium Redesign",
    price: "$999+",
    description:
      "Full redesign, copywriting, booking/contact flow, analytics, SEO basics, and maintenance option.",
  },
];

const processSteps = [
  "Audit your current website",
  "Share improvement plan",
  "Build modern website",
  "Launch and support",
];

const clients = [
  "Restaurants",
  "Clinics",
  "Salons",
  "Real estate",
  "Tuition centers",
  "Local services",
  "Hotels",
  "Consultants",
];

const initialAuditForm = {
  name: "",
  business: "",
  website: "",
  websiteStatus: "",
  email: "",
  message: "",
};

export default function Home() {
  const [auditForm, setAuditForm] = useState(initialAuditForm);
  const [auditFormError, setAuditFormError] = useState("");
  const [auditFormStatus, setAuditFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [isAuditSubmitting, setIsAuditSubmitting] = useState(false);

  async function handleAuditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedForm = {
      name: auditForm.name.trim(),
      business: auditForm.business.trim(),
      website: auditForm.website.trim(),
      websiteStatus: auditForm.websiteStatus.trim(),
      email: auditForm.email.trim(),
      message: auditForm.message.trim(),
    };

    if (
      !trimmedForm.name ||
      !trimmedForm.business ||
      !trimmedForm.websiteStatus ||
      !trimmedForm.email
    ) {
      setAuditFormError("Please fill in all required fields.");
      setAuditFormStatus("idle");
      return;
    }

    setAuditFormError("");
    setAuditFormStatus("idle");
    setIsAuditSubmitting(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase environment variables.");
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from("audit_requests").insert({
        name: trimmedForm.name,
        business_name: trimmedForm.business,
        website_status: trimmedForm.websiteStatus,
        existing_website_url: trimmedForm.website || null,
        email: trimmedForm.email,
        message: trimmedForm.message || null,
      });

      if (error) {
        throw error;
      }

      setAuditForm(initialAuditForm);
      setAuditFormStatus("success");
    } catch {
      setAuditFormStatus("error");
    } finally {
      setIsAuditSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-cloud text-ink">
      <section className="relative bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.35),transparent_36%),linear-gradient(135deg,rgba(249,115,22,0.18),transparent_35%)]" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <a href="#" className="font-heading text-xl font-extrabold tracking-wide">
            BSSR10X
          </a>
          <a
            href="#audit"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/60"
          >
            Free Audit
          </a>
        </nav>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div className="flex flex-col justify-center">
            <p className="mb-5 inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-teal-100">
              AI-powered website audits for local businesses
            </p>
            <h1 className="font-heading text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl lg:text-7xl">
              Build Better Websites. Start Your Revolution.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              We help local businesses transform outdated websites into clean,
              mobile-friendly pages designed to bring more enquiries, bookings,
              and customer trust.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#audit"
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-ink shadow-soft transition hover:bg-teal-50"
              >
                Get Free Website Audit
              </a>
              <a
                href="#packages"
                className="rounded-full border border-white/25 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-white/70"
              >
                View Packages
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300">
              {clients.map((client) => (
                <span
                  key={client}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-5 text-ink">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Website score</p>
                  <p className="mt-1 font-heading text-3xl font-extrabold">72 → 94</p>
                </div>
                <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-accent">
                  Lead-ready
                </span>
              </div>
              <div className="grid gap-4 py-6">
                {[
                  ["Mobile CTA", "Add sticky call and WhatsApp buttons"],
                  ["Trust", "Place reviews near service decision points"],
                  ["Speed", "Compress media and simplify heavy sections"],
                ].map(([label, text]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-bold text-ink">{label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-ink p-5 text-white">
                <p className="text-sm text-slate-300">Next best action</p>
                <p className="mt-2 text-lg font-bold">
                  Make booking possible in one tap on mobile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8" id="problems">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            Problems
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            Your website may be losing customers silently
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 h-2 w-12 rounded-full bg-gradient-to-r from-accent to-ember" />
              <h3 className="text-lg font-bold">{problem}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20" id="solution">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Solution
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              We fix the gaps that stop visitors from becoming customers
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              BSSR10X focuses on the parts of your website that matter most for
              local customers: clarity, trust, speed, and effortless contact.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {solutions.map((solution) => (
              <div
                key={solution}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-cloud p-5"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  ✓
                </span>
                <p className="font-semibold">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8" id="audit">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
            AI Website Audit
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            Free AI Website Audit
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Share your website link and we’ll identify 3 practical improvements
            to help customers contact, book, or enquire more easily.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleAuditSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Name", "name", "text"],
              ["Business Name", "business", "text"],
              ["Email", "email", "email"],
            ].map(([label, name, type]) => (
              <label key={name} className="block">
                <span className="text-sm font-bold text-slate-700">{label}</span>
                <input
                  required
                  name={name}
                  type={type}
                  value={auditForm[name as keyof typeof auditForm]}
                  onChange={(event) => {
                    setAuditForm((currentForm) => ({
                      ...currentForm,
                      [name]: event.target.value,
                    }));
                    if (auditFormError) {
                      setAuditFormError("");
                    }
                    if (auditFormStatus !== "idle") {
                      setAuditFormStatus("idle");
                    }
                  }}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Existing Website URL (optional)
              </span>
              <input
                name="website"
                type="text"
                placeholder="Paste your website link, or type N/A if you don’t have one"
                value={auditForm.website}
                onChange={(event) => {
                  setAuditForm((currentForm) => ({
                    ...currentForm,
                    website: event.target.value,
                  }));
                  if (auditFormStatus !== "idle") {
                    setAuditFormStatus("idle");
                  }
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Website Status</span>
              <select
                required
                name="websiteStatus"
                value={auditForm.websiteStatus}
                onChange={(event) => {
                  setAuditForm((currentForm) => ({
                    ...currentForm,
                    websiteStatus: event.target.value,
                  }));
                  if (auditFormError) {
                    setAuditFormError("");
                  }
                  if (auditFormStatus !== "idle") {
                    setAuditFormStatus("idle");
                  }
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-teal-100"
              >
                <option value="">Select website status</option>
                <option value="I already have a website">I already have a website</option>
                <option value="I need a new website">I need a new website</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-bold text-slate-700">
                Message / Requirements (optional)
              </span>
              <textarea
                name="message"
                rows={4}
                value={auditForm.message}
                onChange={(event) => {
                  setAuditForm((currentForm) => ({
                    ...currentForm,
                    message: event.target.value,
                  }));
                  if (auditFormStatus !== "idle") {
                    setAuditFormStatus("idle");
                  }
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </label>
          </div>
          {auditFormError ? (
            <p className="mt-4 text-sm font-semibold text-red-600">{auditFormError}</p>
          ) : null}
          {auditFormStatus === "success" ? (
            <p className="mt-4 text-sm font-semibold text-accent">
              Thank you! We received your request. We&rsquo;ll review your details
              and get back to you shortly.
            </p>
          ) : null}
          {auditFormStatus === "error" ? (
            <p className="mt-4 text-sm font-semibold text-red-600">
              Something went wrong. Please try again or email us at
              sumanaai.official@gmail.com.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isAuditSubmitting}
            className="mt-6 w-full rounded-full bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isAuditSubmitting ? "Submitting..." : "Request Free Audit"}
          </button>
        </form>
      </section>

      <section className="bg-ink py-20 text-white" id="packages">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-200">
              Packages
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Practical website packages for growing local businesses
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
              >
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="mt-4 font-heading text-4xl font-extrabold text-white">
                  {item.price}
                </p>
                <p className="mt-5 leading-7 text-slate-300">{item.description}</p>
                <a
                  href="#audit"
                  className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-teal-50"
                >
                  Request Audit
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8" id="process">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
          Process
        </p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
          Simple process
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="font-heading text-3xl font-extrabold text-accent">
                0{index + 1}
              </span>
              <p className="mt-5 font-bold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10 lg:px-8" id="contact">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 shadow-soft sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Contact
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold">
              Ready to improve your website?
            </h2>
            <a
              href="mailto:sumanaai.official@gmail.com"
              className="mt-4 inline-flex text-lg font-bold text-accent"
            >
              sumanaai.official@gmail.com
            </a>
          </div>
          <a
            href="#audit"
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800 lg:mt-0"
          >
            Get Free Website Audit
          </a>
        </div>
      </section>

      <footer className="px-6 pb-8 text-center text-sm text-slate-500">
        © 2026 BSSR10X. AI-powered web design and website audits.
      </footer>
    </main>
  );
}
