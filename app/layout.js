import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";  // Import global styles

// Apply Geist fonts to the app
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO and title
export const metadata = {
  title: "My Portfolio",
  description: "This is my Portfolio",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}  {/* This will render the content of each page */}
      </body>
    </html>
  );
}
