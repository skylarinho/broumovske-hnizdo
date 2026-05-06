import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/kontakt")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "book" });
  },
  component: () => null,
});
