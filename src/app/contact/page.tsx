"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!name || !email || !message) {
      setStatus("All fields (name, email, and message) are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("/api/contact-admins", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setStatus(`Failed to send message: ${errorData.message}`);
        return;
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setStatus(data.message || "Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const text = await response.text();
        setStatus(`Unexpected response format: ${text}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An unexpected error occurred.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-lg p-6 bg-gradient-to-b from-transparent to-black rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8">Contact Us</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={4}
              required
              className="w-full px-4 py-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-8 py-3 text-lg font-bold border border-white rounded-md bg-transparent hover:bg-white hover:text-black transition"
            >
              Send Message
            </button>
          </div>
        </form>
        {status && <p className="text-center text-sm mt-4">{status}</p>}
      </div>
    </div>
  );
};

export default ContactForm;
