import React, { useState } from "react";
import { Link } from "react-router";
import Hero from "~/components/hero";
import { BookingForm } from "~/components/booking/BookingForm";
import { useAuth } from "~/contexts/AuthContext";
export function meta() {
  return [
    { title: "Let Us Help - Home Page" },
    {
      name: "description",
      content:
        "Find the help you need, today. From a graphic mechanic or a plumber, we connect you with skilled professionals.",
    },
  ];
}

export default function Home() {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const { user } = useAuth();

  const handleBookingClick = () => {
    if (!user) {
      // Redirect to auth page if not logged in
      window.location.href = "/auth";
      return;
    }
    setIsBookingFormOpen(true);
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
                Find the help you need, today.
              </h1>
              <p className="text-lg lg:text-xl text-[var(--text-color)] mb-8">
                From a graphic mechanic or a plumber, we connect you with
                skilled professionals.
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    className="w-full py-4 pl-6 pr-32 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-shadow"
                    placeholder="What service are you looking for?"
                    type="text"
                  />
                  <button className="absolute inset-y-0 right-0 flex items-center bg-[var(--primary-color)] text-white font-semibold px-8 rounded-full m-2 shadow-soft hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined mr-2">
                      search
                    </span>
                    Search
                  </button>
                </div>
                <button
                  onClick={handleBookingClick}
                  className="mt-6 bg-[var(--secondary-color)] text-white font-semibold px-8 py-3 rounded-lg shadow-soft hover:opacity-90 transition-opacity"
                >
                  Post a Service Request
                </button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="bg-[var(--accent-color)] py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-12">
                Browse Services by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <Link
                  to="/category/plumbers"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    plumbing
                  </span>
                  <h3 className="font-semibold text-lg">Plumbers</h3>
                </Link>
                <Link
                  to="/category/electricians"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    electrical_services
                  </span>
                  <h3 className="font-semibold text-lg">Electricians</h3>
                </Link>
                <Link
                  to="/category/carpenters"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    carpenter
                  </span>
                  <h3 className="font-semibold text-lg">Carpenters</h3>
                </Link>
                <Link
                  to="/category/painters"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    format_paint
                  </span>
                  <h3 className="font-semibold text-lg">Painters</h3>
                </Link>
                <Link
                  to="/category/gardeners"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    yard
                  </span>
                  <h3 className="font-semibold text-lg">Gardeners</h3>
                </Link>
                <Link
                  to="/category/cleaners"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    cleaning_services
                  </span>
                  <h3 className="font-semibold text-lg">Cleaners</h3>
                </Link>
                <Link
                  to="/category/mechanics"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    build
                  </span>
                  <h3 className="font-semibold text-lg">Mechanics</h3>
                </Link>
                <Link
                  to="/category/graphic-designers"
                  className="bg-white p-6 rounded-lg shadow-soft text-center flex flex-col items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl text-[var(--primary-color)] mb-4">
                    palette
                  </span>
                  <h3 className="font-semibold text-lg">Graphic Designers</h3>
                </Link>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="bg-white py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-12">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-[var(--primary-color)] text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-soft">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Post Your Request</h3>
                  <p className="text-gray-600">
                    Tell us what you need. It's free and takes just a few
                    minutes.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-[var(--primary-color)] text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-soft">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Get Matched</h3>
                  <p className="text-gray-600">
                    We'll connect you with qualified and available
                    professionals.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-[var(--primary-color)] text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-soft">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Hire with Confidence
                  </h3>
                  <p className="text-gray-600">
                    Review profiles, compare quotes, and hire the right pro for
                    the job.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="bg-[var(--accent-color)] py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-[var(--secondary-color)] mb-12">
                Testimonials & Featured Providers
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-soft">
                  <div className="flex items-center mb-4">
                    <img
                      alt="John Doe"
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkn4mtXMie1TYbara5nfaBqutDOV3-LSoE3sNeNN2uRirAQ5_rTgaCAKf-nox61BgyGqXk21whK8nsDiuLi0bSHr6zSf35QaOv0Jyo52bZKg-7yFz-A2Hwt5aYwrdB85spgO4Wap8ykYDGlmrox_pQW1TuAzd6NMotKiqaENrrdOfPorIA-hM-tfzMAK5NrWiIUaev22br_4NnyGDQyWuzECkwhWEgkDY-Ycumnaejk4mPwSe4CkYroyUcBLDwFsGrpsGq5fa_zeQ"
                    />
                    <div>
                      <h4 className="font-bold text-lg">Jeevan</h4>

                      <div className="flex text-[var(--primary-color)] mt-1">
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Let Us Help made it so easy to find a reliable electrician.
                    John was professional, on time, and did an excellent job. I
                    couldn't be happier!"
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-soft">
                  <div className="flex items-center mb-4">
                    <img
                      alt="Jane Smith"
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0Kqk5JCbAQaMrOa-JNaHD4mpCHUTaI3I-4OBpcmZ23A2lGTIM7Wldwp46HcUzPQk_nXKk_Jk5JF3NmqdJoZ8oDy8M8xTrc5DP2VJ0YA29lppYvmCRXAXgsa4LcSC-cqlTyzEDx1wz5Loq85LuYcwoYIl2W2y7p540xf4iN_VvmqsYl13EiMiWaVlhJ5DlJ5GVGlmFHDK-GGNRatBzxmvJGZqZKsH62KFIR5CH_9U8J6rMtTCJc286OJTkrdkel3NFspXSIZtsPZk"
                    />
                    <div>
                      <h4 className="font-bold text-lg">Himanshu</h4>

                      <div className="flex text-[var(--primary-color)] mt-1">
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star_half
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "I needed a plumber urgently, and this platform delivered.
                    Jane was fantastic, quickly fixing the issue. Highly
                    recommend this service."
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-soft">
                  <div className="flex items-center mb-4">
                    <img
                      alt="Mike Williams"
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWLWairYrH3XuUlczcJscq5wKCEuDz-4-daXUEWKIm0AOg5eNryF3Uf74-TCEGsan8CTdGo3tq5GFkwjBtyuMQ8TwKYIdA92HHMOKvdTdVxAeIXUYt07vbkj3HUYF607-8-1V2QYWySXObKkOhPKr-wVrjXBAkqpgHojzXbUcB0hKstBMVj8ljOauWzNNNW0FOwR8Uco_ZwFXX00Lhuboe6gqiwwr88LnD40fSnoePvRZJdR3jpMdP-RgWPZYfowbSVaW9xDy7blg"
                    />
                    <div>
                      <h4 className="font-bold text-lg">Bipin Pandey</h4>

                      <div className="flex text-[var(--primary-color)] mt-1">
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                        <span className="material-symbols-outlined text-base">
                          star
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "My garden was a mess, but Mike transformed it completely.
                    He's a true professional with a green thumb. I'm so
                    grateful!"
                  </p>
                </div>
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
                      ></path>
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
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
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
                      ></path>
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

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
        onSuccess={() => {
          // Optionally redirect to dashboard or show success message
          console.log("Booking request created successfully!");
        }}
      />
    </div>
  );
}
