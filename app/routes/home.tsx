import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="h-screen bg-neutral-100 grid place-content-center">
      <div className="flex gap-3 p-3">
        <Link
          to="/history"
          className="bg-gray-200 px-9 cursor-pointer text-gray-600 rounded-md text-center p-3 transition hover:text-white hover:bg-gray-600"
        >
          历史周报
        </Link>
        <Link
          to="/current"
          className="bg-gray-200 px-9 cursor-pointer text-gray-600 rounded-md text-center p-3 transition hover:text-white hover:bg-gray-600"
        >
          本周周报
        </Link>
      </div>
    </div>
  );
}
