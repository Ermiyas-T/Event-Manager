"use client";
import Link from "next/link";
import { Button } from "@/ui/button";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Event Manager
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/events" className="hover:text-gray-300 transition">
            Events
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMenu}
            className="border-white text-white hover:bg-blue-700"
          >
            ☰
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white py-4 mt-2 space-y-4">
          <Link href="/" className="block text-center" onClick={toggleMenu}>
            Home
          </Link>
          <Link
            href="/events"
            className="block text-center"
            onClick={toggleMenu}
          >
            Events
          </Link>
          <Link
            href="/about"
            className="block text-center"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-center"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
