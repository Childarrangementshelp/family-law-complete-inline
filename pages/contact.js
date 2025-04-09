// pages/contact.js
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-center mb-8">
        Request additional help or send us any questions:
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="How can we help?"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>

      {status === 'success' && (
        <p className="text-green-600 text-center mt-4">
          Thanks for contacting us! We'll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-center mt-4">
          Sorry, there was an error sending your message.
        </p>
      )}
    </main>
  );
}
