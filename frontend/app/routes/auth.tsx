import { AuthPage } from "~/components/auth/AuthPage";

export function meta() {
  return [
    { title: "Sign In / Sign Up - LetUsHelp" },
    {
      name: "description",
      content: "Sign in to your LetUsHelp account or create a new one",
    },
  ];
}

export default function Auth() {
  return <AuthPage />;
}
