export default function ContactPage() {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-center mb-8">
          Request additional help or send us any questions:
        </p>
  
        <form className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              rows={5}
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
      </main>
    );
  }
  