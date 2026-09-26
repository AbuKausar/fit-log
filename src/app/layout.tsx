import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "FitLog is a dark, no-nonsense workout library and daily planner. ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <PlanProvider>
          <Toaster position="top-center" />
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
        </PlanProvider>
      </body>
    </html>
  );
}
