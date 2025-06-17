import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Assuming you're using react-icons
import { Button } from "@/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="space-y-4">
          <p className="text-lg font-bold">Event Manager</p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Event Manager, All Rights
            Reserved.
          </p>
        </div>

        <div className="space-x-4 flex items-center">
          <Button
            as="a"
            href="https://facebook.com"
            target="_blank"
            variant="link"
            className="text-white hover:text-blue-500"
          >
            <FaFacebook size={20} />
          </Button>
          <Button
            as="a"
            href="https://twitter.com"
            target="_blank"
            variant="link"
            className="text-white hover:text-blue-400"
          >
            <FaTwitter size={20} />
          </Button>
          <Button
            as="a"
            href="https://instagram.com"
            target="_blank"
            variant="link"
            className="text-white hover:text-pink-500"
          >
            <FaInstagram size={20} />
          </Button>
        </div>
      </div>
    </footer>
  );
}
