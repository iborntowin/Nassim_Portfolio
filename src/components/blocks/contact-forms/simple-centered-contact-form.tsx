"use client";

import React, { useState } from "react";
import { IconMailFilled } from "@tabler/icons-react";

const EMAIL = "nassimmaaoui@outlook.com";

export function SimpleCenteredContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [opened, setOpened] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Invalid email address.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setOpened(false);
      return;
    }

    const subject = `Internship enquiry — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company.trim() ? `Company: ${form.company}` : null,
      "",
      form.message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
    setErrors({});
  };

  return (
    <div className="relative flex justify-center items-center py-8 px-2">
      <div className="relative w-full max-w-lg rounded-2xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-6 md:p-8">
        <IconMailFilled className="absolute top-6 right-6 w-8 h-8 text-[var(--color-primary-accent)] opacity-20" aria-hidden="true" />

        <h2 className="text-2xl font-bold mb-1 text-[var(--color-text-primary)]">
          Send a message
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          This opens your mail client with the message ready to send.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-primary)]">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--color-text-secondary)]/25 bg-[var(--color-primary-background)] px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/60 focus:ring-2 focus:ring-[var(--color-secondary-accent)] focus:outline-none transition"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--color-text-secondary)]/25 bg-[var(--color-primary-background)] px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/60 focus:ring-2 focus:ring-[var(--color-secondary-accent)] focus:outline-none transition"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[var(--color-text-primary)]">
              Company <span className="text-[var(--color-text-secondary)] font-normal">(optional)</span>
            </label>
            <input
              id="company"
              type="text"
              placeholder="Company name"
              value={form.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--color-text-secondary)]/25 bg-[var(--color-primary-background)] px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/60 focus:ring-2 focus:ring-[var(--color-secondary-accent)] focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)]">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me about the internship or role…"
              value={form.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--color-text-secondary)]/25 bg-[var(--color-primary-background)] px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/60 focus:ring-2 focus:ring-[var(--color-secondary-accent)] focus:outline-none transition resize-y"
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--color-text-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-primary-background)] hover:opacity-90 transition-opacity"
          >
            Open in mail client
          </button>

          <p className="text-xs text-[var(--color-text-secondary)] text-center">
            Prefer email? Write to{" "}
            <a href={`mailto:${EMAIL}`} className="text-[var(--color-secondary-accent)] hover:underline">
              {EMAIL}
            </a>
          </p>

          {opened && (
            <p className="text-xs text-center text-[var(--color-text-secondary)]">
              Your mail client should now be open. If it is not, copy the address above.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
