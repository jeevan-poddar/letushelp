import React from "react";
import { Link } from "react-router";
import Hero from "~/components/hero";

export function meta() {
  return [
    { title: "About Us - Let Us Help" },
    {
      name: "description",
      content:
        "Learn about Let Us Help - your trusted platform for connecting with skilled service professionals. Our mission is to make finding reliable help easy and accessible.",
    },
  ];
}

export default function About() {
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
                About Let Us Help
              </h1>
              <p className="text-lg lg:text-xl text-[var(--text-color)] mb-8 max-w-3xl mx-auto">
                We're on a mission to connect people with trusted service
                professionals, making it easier than ever to get the help you
                need for your home and business.
              </p>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="bg-[var(--accent-color)] py-20">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-6">
                    Our Story
                  </h2>
                  <p className="text-[var(--text-color)] mb-6 leading-relaxed">
                    Founded in 2025, Let Us Help was born from a simple
                    observation: finding reliable, skilled professionals for
                    everyday tasks shouldn't be a struggle. Whether you need a
                    plumber to fix a leak, an electrician to install a ceiling
                    fan, or a carpenter to build custom furniture, we believe
                    everyone deserves access to quality service.
                  </p>
                  <p className="text-[var(--text-color)] leading-relaxed">
                    Our platform connects homeowners and businesses with vetted,
                    experienced professionals who take pride in their work.
                    We've streamlined the process of finding help, making it as
                    simple as posting a request and getting matched with
                    qualified providers in your area.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration"
                    className="rounded-lg shadow-soft w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Values Section */}
          <section className="bg-white py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-12">
                Our Mission & Values
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="bg-[var(--primary-color)] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">
                      verified_user
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--secondary-color)]">
                    Trust & Safety
                  </h3>
                  <p className="text-[var(--text-color)]">
                    Every professional on our platform is thoroughly vetted. We
                    verify credentials, check references, and maintain high
                    standards to ensure your safety and satisfaction.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="bg-[var(--primary-color)] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">
                      handshake
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--secondary-color)]">
                    Quality Service
                  </h3>
                  <p className="text-[var(--text-color)]">
                    We're committed to connecting you with skilled professionals
                    who deliver exceptional work. Our rating system ensures
                    accountability and continuous improvement.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="bg-[var(--primary-color)] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">
                      accessibility
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[var(--secondary-color)]">
                    Accessibility
                  </h3>
                  <p className="text-[var(--text-color)]">
                    Quality service should be accessible to everyone. We work to
                    keep our platform affordable and user-friendly, removing
                    barriers between you and the help you need.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Work Section */}
          <section className="bg-[var(--accent-color)] py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-12">
                How We Work
              </h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Professional at work"
                    className="rounded-lg shadow-soft w-full h-80 object-cover"
                  />
                </div>
                <div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-color)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-2">
                          Rigorous Vetting
                        </h3>
                        <p className="text-[var(--text-color)]">
                          We carefully screen all service providers, checking
                          licenses, insurance, references, and conducting
                          background checks to ensure reliability.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-color)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-2">
                          Smart Matching
                        </h3>
                        <p className="text-[var(--text-color)]">
                          Our algorithm matches you with the right professionals
                          based on your specific needs, location, timeline, and
                          budget preferences.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--primary-color)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--secondary-color)] mb-2">
                          Ongoing Support
                        </h3>
                        <p className="text-[var(--text-color)]">
                          From initial booking to project completion, we're here
                          to ensure everything goes smoothly. Our support team
                          is available to help resolve any issues.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-white py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-12">
                Our Impact
              </h2>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">
                    500+
                  </div>
                  <p className="text-[var(--text-color)]">
                    Verified Professionals
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">
                    2,500+
                  </div>
                  <p className="text-[var(--text-color)]">Completed Projects</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">
                    4.8
                  </div>
                  <p className="text-[var(--text-color)]">Average Rating</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">
                    98%
                  </div>
                  <p className="text-[var(--text-color)]">
                    Customer Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Join Us Section */}
          <section className="bg-white py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-6">
                Join Our Community
              </h2>
              <p className="text-lg text-[var(--text-color)] mb-8 max-w-2xl mx-auto">
                Whether you're looking for reliable service professionals or
                you're a skilled professional wanting to grow your business,
                we'd love to have you join our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auth"
                  className="bg-[var(--primary-color)] text-white font-semibold px-8 py-3 rounded-lg shadow-soft hover:opacity-90 transition-opacity"
                >
                  Find Services
                </Link>
                <Link
                  to="/auth"
                  className="bg-[var(--secondary-color)] text-white font-semibold px-8 py-3 rounded-lg shadow-soft hover:opacity-90 transition-opacity"
                >
                  Become a Provider
                </Link>
              </div>
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
