import Link from "next/link"; // for navigation
import { Button } from "@/ui/button";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Event Manager</h1>

        <Link href="/events">
          <Button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700">
            View All Events
          </Button>
        </Link>
      </div>
    </div>
  );
}
