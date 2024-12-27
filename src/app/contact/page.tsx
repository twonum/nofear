/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Prepare form data in JSON format to send with fetch
    const formData = {
      access_key: "d5e71c26-c571-44c9-a647-d1d7307f3567",
      name,
      email,
      message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Email Sent Successfully!");
        setName(""); // Clear the form fields on success
        setEmail("");
        setMessage("");
      } else {
        setError(data.message || "An unknown error occurred");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-lg p-6 bg-gradient-to-b from-transparent to-black rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8">Contact Us</h1>
        <form className="space-y-6" onSubmit={onSubmit}>
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
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
        {error && (
          <p className="text-center text-sm mt-4 text-red-500">{error}</p>
        )}
        {success && (
          <p className="text-center text-sm mt-4 text-green-500">{success}</p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
