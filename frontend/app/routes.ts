import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth", "routes/auth.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("category/:categoryName", "routes/category.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
