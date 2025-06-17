import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer"; // assuming you have a Footer component
import "./globals.css"; // import global styles

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
