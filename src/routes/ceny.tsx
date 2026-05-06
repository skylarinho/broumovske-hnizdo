import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ceny")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "ceny" });
  },
  component: () => null,
});
