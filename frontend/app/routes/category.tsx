import React from "react";
import { useParams } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import Navbar from "~/components/Navbar";

export function meta({ params }: { params: { categoryName: string } }) {
  const categoryName = params.categoryName;
  const formattedCategory =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return [
    { title: `${formattedCategory} Services - Let Us Help` },
    {
      name: "description",
      content: `Find professional ${formattedCategory.toLowerCase()} services in your area. Connect with qualified ${formattedCategory.toLowerCase()} and get quotes for your project.`,
    },
  ];
}

// Hardcoded service data for different categories
const serviceData = {
  plumbers: {
    categoryTitle: "Plumber",
    icon: "plumbing",
    heroImage:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 1,
        providerName: "Alex Plumbing Co.",
        rating: 4.8,
        reviewCount: 125,
        location: "Noida, UP",
        availability: "Mon-Fri, 9 AM - 6 PM",
        hourlyRate: 800,
        description:
          "Alex Plumbing Co. offers top-notch plumbing solutions for residential and commercial clients. With over 10 years of experience, our certified plumbers ensure quality workmanship and customer satisfaction.",
        servicesOffered:
          "Our services include leak repairs, pipe installations, drain cleaning, water heater maintenance, and emergency plumbing. We handle projects of all sizes with professionalism and efficiency.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571737780059-f0f4b0ca6b08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Ethan Carter",
            rating: 5,
            timeAgo: "2 weeks ago",
            comment:
              "Alex Plumbing Co. fixed my leaky faucet quickly and efficiently. Highly recommend!",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
          {
            name: "Sophia Lee",
            rating: 4,
            timeAgo: "1 month ago",
            comment:
              "Good service overall, but communication could be improved.",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b566?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
      {
        id: 2,
        providerName: "Emergency Plumbing Solutions",
        rating: 4.6,
        reviewCount: 89,
        location: " Noida, UP",
        availability: "24/7 Emergency Service",
        hourlyRate: 950,
        description:
          "We provide emergency plumbing services around the clock. Our team is equipped to handle any plumbing emergency with quick response times and professional service.",
        servicesOffered:
          "Emergency repairs, burst pipe fixes, drain unclogging, toilet repairs, and water line installations. Available 24/7 for urgent plumbing needs.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Marcus Johnson",
            rating: 5,
            timeAgo: "3 days ago",
            comment:
              "Called them at 2 AM for a burst pipe emergency. They arrived within 30 minutes and fixed the issue. Amazing service!",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
  electricians: {
    categoryTitle: "Electrician",
    icon: "electrical_services",
    heroImage:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 3,
        providerName: "Spark Electric Services",
        rating: 4.9,
        reviewCount: 156,
        location: " Noida, UP",
        availability: "Mon-Sat, 8 AM - 7 PM",
        hourlyRate: 850,
        description:
          "Spark Electric Services provides comprehensive electrical solutions for homes and businesses. Our licensed electricians deliver safe, reliable, and code-compliant electrical work.",
        servicesOffered:
          "Electrical installations, rewiring, panel upgrades, outlet installations, lighting design, ceiling fan installation, and electrical troubleshooting.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Sarah Wilson",
            rating: 5,
            timeAgo: "1 week ago",
            comment:
              "Professional service and fair pricing. They upgraded my electrical panel efficiently.",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
  carpenters: {
    categoryTitle: "Carpenter",
    icon: "carpenter",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 4,
        providerName: "Master Carpentry Works",
        rating: 4.7,
        reviewCount: 98,
        location: " Noida, UP",
        availability: "Mon-Fri, 7 AM - 5 PM",
        hourlyRate: 750,
        description:
          "Master Carpentry Works specializes in custom carpentry and woodworking projects. From furniture restoration to custom cabinets, we bring your vision to life.",
        servicesOffered:
          "Custom furniture, cabinet installation, deck building, trim work, door installation, shelving, and furniture repair.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1544700958-6a2e36e11e1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "David Chen",
            rating: 5,
            timeAgo: "2 weeks ago",
            comment:
              "Excellent craftsmanship on our custom kitchen cabinets. Highly skilled and professional.",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
  painters: {
    categoryTitle: "Painter",
    icon: "format_paint",
    heroImage:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 5,
        providerName: "Premium Paint Solutions",
        rating: 4.8,
        reviewCount: 134,
        location: " Noida, UP",
        availability: "Mon-Sat, 8 AM - 6 PM",
        hourlyRate: 600,
        description:
          "Premium Paint Solutions delivers high-quality interior and exterior painting services. We use premium paints and materials to ensure lasting results.",
        servicesOffered:
          "Interior painting, exterior painting, cabinet painting, color consultation, wall preparation, and protective coatings.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Lisa Rodriguez",
            rating: 5,
            timeAgo: "1 week ago",
            comment:
              "Beautiful paint job on our living room. Very clean and professional work.",
            avatar:
              "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
  gardeners: {
    categoryTitle: "Gardener",
    icon: "yard",
    heroImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 6,
        providerName: "Green Thumb Landscaping",
        rating: 4.6,
        reviewCount: 76,
        location: " Noida, UP",
        availability: "Tue-Sat, 7 AM - 4 PM",
        hourlyRate: 550,
        description:
          "Green Thumb Landscaping provides comprehensive garden and landscape services. We help maintain and transform outdoor spaces into beautiful gardens.",
        servicesOffered:
          "Lawn maintenance, garden design, tree trimming, irrigation systems, seasonal planting, and landscape installation.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1558093341-decbb2fdc3f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Michael Brown",
            rating: 4,
            timeAgo: "3 weeks ago",
            comment:
              "Great work on our backyard landscape. The team was professional and efficient.",
            avatar:
              "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
  cleaners: {
    categoryTitle: "Cleaner",
    icon: "cleaning_services",
    heroImage:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 7,
        providerName: "Spotless Cleaning Services",
        rating: 4.9,
        reviewCount: 203,
        location: " Noida, UP",
        availability: "Mon-Sun, 8 AM - 8 PM",
        hourlyRate: 450,
        description:
          "Spotless Cleaning Services offers professional cleaning for homes and offices. We use eco-friendly products and provide thorough, reliable cleaning services.",
        servicesOffered:
          "Regular house cleaning, deep cleaning, move-in/out cleaning, office cleaning, carpet cleaning, and window cleaning.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Jennifer Kim",
            rating: 5,
            timeAgo: "4 days ago",
            comment:
              "Outstanding cleaning service! They left our house sparkling clean. Will definitely book again.",
            avatar:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
  mechanics: {
    categoryTitle: "Mechanic",
    icon: "build",
    heroImage:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 8,
        providerName: "AutoCare Mobile Mechanics",
        rating: 4.7,
        reviewCount: 112,
        location: " Noida, UP",
        availability: "Mon-Sat, 8 AM - 6 PM",
        hourlyRate: 900,
        description:
          "AutoCare Mobile Mechanics brings professional automotive repair services to your location. Our certified technicians provide convenient, reliable car repair and maintenance.",
        servicesOffered:
          "Oil changes, brake repairs, engine diagnostics, tire installation, battery replacement, and routine maintenance services.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Robert Taylor",
            rating: 5,
            timeAgo: "1 week ago",
            comment:
              "Excellent mobile service! Fixed my car right in my driveway. Very professional and knowledgeable.",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
  "graphic-designers": {
    categoryTitle: "Graphic Designer",
    icon: "palette",
    heroImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    services: [
      {
        id: 9,
        providerName: "Creative Design Studio",
        rating: 4.8,
        reviewCount: 87,
        location: "Noida, UP",
        availability: "Mon-Fri, 9 AM - 6 PM",
        hourlyRate: 700,
        description:
          "Creative Design Studio specializes in visual communication and brand design. We create compelling graphics that help businesses stand out and connect with their audience.",
        servicesOffered:
          "Logo design, brand identity, print design, web graphics, social media assets, packaging design, and marketing materials.",
        portfolioImages: [
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        reviews: [
          {
            name: "Amanda Foster",
            rating: 5,
            timeAgo: "2 weeks ago",
            comment:
              "Amazing logo design for our startup! Very creative and professional. Exceeded our expectations.",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b566?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          },
        ],
      },
    ],
  },
};

const relatedServices = [
  {
    name: "Electrical Services",
    description: "Reliable electrical solutions",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    link: "/category/electricians",
  },
  {
    name: "Carpentry Services",
    description: "Custom carpentry and repairs",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    link: "/category/carpenters",
  },
  {
    name: "Painting Services",
    description: "Professional painting services",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    link: "/category/painters",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-base text-[var(--primary-color)]"
        >
          star
        </span>
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-base text-[var(--primary-color)]"
        >
          star_half
        </span>
      );
    } else {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-base text-gray-300"
        >
          star
        </span>
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

const RatingBreakdown = ({ rating }: { rating: number }) => {
  // Simplified rating breakdown based on overall rating
  const breakdown = [
    { stars: 5, percentage: Math.max(0, (rating - 4) * 100) },
    {
      stars: 4,
      percentage:
        rating >= 4 ? Math.min(30, (5 - rating) * 60) : (rating - 3) * 100,
    },
    {
      stars: 3,
      percentage:
        rating >= 3 && rating < 4 ? Math.min(20, (4 - rating) * 100) : 5,
    },
    { stars: 2, percentage: rating < 3 ? Math.max(10, (3 - rating) * 50) : 3 },
    { stars: 1, percentage: rating < 2 ? Math.max(20, (2 - rating) * 100) : 2 },
  ];

  return (
    <div className="space-y-1">
      {breakdown.map((item) => (
        <div key={item.stars} className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-3">{item.stars}</span>
          <div className="flex-grow h-1.5 bg-gray-300 rounded-full">
            <div
              className="bg-[var(--primary-color)] h-1.5 rounded-full"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { user } = useAuth();

  const categoryData = serviceData[categoryName as keyof typeof serviceData];

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-[var(--background-color)]">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold text-[var(--text-color)] mb-2">
            Category Not Found
          </h1>
          <p className="text-gray-600">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const mainService = categoryData.services[0];

  const handleServiceRequest = () => {
    if (!user) {
      window.location.href = "/auth";
      return;
    }
    // Handle service request logic here
    console.log("Service request for", categoryData.categoryTitle);
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      <Navbar />
      <main>
        <section className="w-full h-48 sm:h-60 md:h-72">
          <img
            alt={`${categoryData.categoryTitle} at work`}
            className="w-full h-full object-cover"
            src={categoryData.heroImage}
          />
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="space-y-1">
            <h1 className="text-[var(--text-color)] text-2xl sm:text-3xl font-bold">
              {categoryData.categoryTitle}
            </h1>
            <p className="text-sm text-gray-600">
              By {mainService.providerName}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center justify-between rounded-lg border border-black/5 bg-white/60 p-4">
                <div>
                  <div className="text-3xl font-bold text-[var(--primary-color)]">
                    {mainService.rating}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {mainService.reviewCount} reviews
                  </div>
                </div>
                <div className="flex-1 pl-6">
                  <RatingBreakdown rating={mainService.rating} />
                </div>
              </div>

              <p className="text-[var(--text-color)] leading-relaxed">
                {mainService.description}
              </p>

              <div className="space-y-3 rounded-lg border border-black/5 bg-white/60 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--text-color)]">
                    Location
                  </span>
                  <span className="text-gray-600">{mainService.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--text-color)]">
                    Availability
                  </span>
                  <span className="text-gray-600">
                    {mainService.availability}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--text-color)]">
                    Rate
                  </span>
                  <span className="text-gray-600">
                    ₹{mainService.hourlyRate}/hour
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[var(--text-color)]">
                  Services Offered
                </h3>
                <p className="text-[var(--text-color)]">
                  {mainService.servicesOffered}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[var(--text-color)]">
                  Portfolio
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {mainService.portfolioImages
                    .slice(0, 2)
                    .map((image, index) => (
                      <img
                        key={index}
                        alt={`Portfolio image ${index + 1}`}
                        className="rounded-md object-cover w-full h-36"
                        src={image}
                      />
                    ))}
                  {mainService.portfolioImages[2] && (
                    <img
                      alt="Portfolio image 3"
                      className="rounded-md object-cover w-full h-36 col-span-2"
                      src={mainService.portfolioImages[2]}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--text-color)]">
                  Reviews
                </h3>
                <div className="space-y-4">
                  {mainService.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-black/5 bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          alt={`${review.name}'s avatar`}
                          className="size-9 rounded-full object-cover"
                          src={review.avatar}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-[var(--text-color)]">
                              {review.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {review.timeAgo}
                            </p>
                          </div>
                          <StarRating rating={review.rating} />
                          <p className="text-sm text-gray-700 mt-1">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="md:col-span-1 space-y-4">
              <button
                onClick={handleServiceRequest}
                className="w-full bg-[var(--primary-color)] text-white font-semibold py-3 px-4 rounded-md hover:opacity-90"
              >
                Request Service
              </button>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-[var(--text-color)]">
                  Related
                </h3>
                <div className="space-y-2">
                  {relatedServices.map((service, index) => (
                    <a
                      key={index}
                      href={service.link}
                      className="flex items-center gap-3 rounded-md border border-black/5 bg-white/60 p-2 hover:bg-white"
                    >
                      <img
                        alt={service.name}
                        className="size-12 object-cover rounded"
                        src={service.image}
                      />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-color)]">
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
