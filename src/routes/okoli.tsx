import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/okoli")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "okoli" });
  },
  component: () => null,
});
