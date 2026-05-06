import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/trasy")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "trasy" });
  },
  component: () => null,
});
