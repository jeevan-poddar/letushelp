import React, { useState } from "react";
import { Link } from "react-router";
import Hero from "~/components/hero";

export function meta() {
  return [
    { title: "Contact Us - Let Us Help" },
    {
      name: "description",
      content:
        "Get in touch with Let Us Help. We're here to answer your questions and help you connect with the right service professionals.",
    },
  ];
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Hero />

        {/* Main Content */}
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="bg-white py-20 lg:py-32">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-[var(--secondary-color)] mb-4">
                Contact Us
              </h1>
              <p className="text-lg lg:text-xl text-[var(--text-color)] mb-8 max-w-3xl mx-auto">
                Have questions? Need help? We're here for you. Reach out to our
                team and we'll get back to you as soon as possible.
              </p>
            </div>
          </section>

          {/* Contact Information & Form */}
          <section className="bg-[var(--accent-color)] py-20">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-8">
                    Get in Touch
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-color)] text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined">
                          location_on
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-2">
                          Our Office
                        </h3>
                        <p className="text-[var(--text-color)]">
                          B-64, Sector 2
                          <br />
                          Noida, UP 201301
                          <br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-color)] text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined">phone</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-2">
                          Phone Support
                        </h3>
                        <p className="text-[var(--text-color)]">
                          Customer Support: +91 98765 43210
                          <br />
                          Business Inquiries: +91 98765 43211
                          <br />
                          Available: Mon-Fri, 9 AM - 9 PM IST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-color)] text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined">email</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-2">
                          Email Support
                        </h3>
                        <p className="text-[var(--text-color)]">
                          General: hello@letushelp.com
                          <br />
                          Support: support@letushelp.com
                          <br />
                          Partnerships: partners@letushelp.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-color)] text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined">
                          schedule
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-2">
                          Business Hours
                        </h3>
                        <p className="text-[var(--text-color)]">
                          Monday - Friday: 9:00 AM - 9:00 PM
                          <br />
                          Saturday: 10:00 AM - 7:00 PM
                          <br />
                          Sunday: 11:00 AM - 5:00 PM
                          <br />
                          <span className="text-sm text-gray-500">
                            All times Indian Standard Time
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-4">
                      Follow Us
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="bg-[var(--primary-color)] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            clipRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-[var(--primary-color)] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-[var(--primary-color)] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            clipRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 6.363a4.731 4.731 0 100 9.462 4.731 4.731 0 000-9.462zM12 15.06a3.06 3.06 0 110-6.12 3.06 3.06 0 010 6.12zM16.95 6.525a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-[var(--primary-color)] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-soft p-8">
                  <h2 className="text-2xl font-bold text-[var(--secondary-color)] mb-6">
                    Send us a Message
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                        <span className="material-symbols-outlined text-2xl mb-2 block">
                          check_circle
                        </span>
                        <h3 className="font-bold mb-2">
                          Message Sent Successfully!
                        </h3>
                        <p>
                          Thank you for contacting us. We'll get back to you
                          within 24 hours.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-[var(--text-color)] mb-2"
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[var(--text-color)] mb-2"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-[var(--text-color)] mb-2"
                        >
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Customer Support</option>
                          <option value="provider">Become a Provider</option>
                          <option value="partnership">
                            Partnership Opportunity
                          </option>
                          <option value="bug">Report a Bug</option>
                          <option value="feature">Feature Request</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-[var(--text-color)] mb-2"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-colors resize-vertical"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[var(--primary-color)] text-white font-bold py-3 px-6 rounded-lg shadow-soft hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="material-symbols-outlined animate-spin inline-block mr-2">
                              refresh
                            </span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined inline-block mr-2">
                              send
                            </span>
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-12">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-3">
                    How do I find a service professional?
                  </h3>
                  <p className="text-[var(--text-color)] mb-6">
                    Simply browse our service categories, post a request, or use
                    our search feature. Our matching system will connect you
                    with qualified professionals in your area.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-3">
                    Are all professionals vetted?
                  </h3>
                  <p className="text-[var(--text-color)] mb-6">
                    Yes! Every professional on our platform undergoes thorough
                    background checks, license verification, and reference
                    checks to ensure quality and safety.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-3">
                    How much does it cost to use the platform?
                  </h3>
                  <p className="text-[var(--text-color)] mb-6">
                    It's free to browse and post requests. You only pay the
                    professional directly for their services. We don't charge
                    any booking fees to customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-3">
                    What if I'm not satisfied with the service?
                  </h3>
                  <p className="text-[var(--text-color)] mb-6">
                    We're committed to your satisfaction. Contact our support
                    team if you experience any issues, and we'll work to resolve
                    them quickly and fairly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="bg-[var(--secondary-color)] text-white py-16">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="text-lg mb-6">
                For urgent service requests or emergency support, call our 24/7
                hotline
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white font-bold px-8 py-3 rounded-lg shadow-soft hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined">phone</span>
                +91 98765 43210
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[var(--secondary-color)] text-white">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Let Us Help</h4>
                <p className="text-sm text-gray-300">
                  Connecting you with the best service professionals in your
                  area.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      className="text-gray-300 hover:text-white transition-colors"
                      to="/about"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors"
                      href="#"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors"
                      href="#"
                    >
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors"
                      href="#"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <Link
                      className="text-gray-300 hover:text-white transition-colors"
                      to="/contact"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors"
                      href="#"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    className="text-gray-300 hover:text-white transition-colors"
                    href="#"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    className="text-gray-300 hover:text-white transition-colors"
                    href="#"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    className="text-gray-300 hover:text-white transition-colors"
                    href="#"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 6.363a4.731 4.731 0 100 9.462 4.731 4.731 0 000-9.462zM12 15.06a3.06 3.06 0 110-6.12 3.06 3.06 0 010 6.12zM16.95 6.525a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
              <p>©️ 2025 Let Us Help. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
