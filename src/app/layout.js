// import dns from "dns";

// dns.setServers(["8.8.8.8", "8.8.4.4"]);


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "./components/Navber";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook || Home",
  description: "Study rooms for students",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navber></Navber>
        {children}
        <ToastProvider />
        <Footer></Footer>
      </body>
    </html>
  );
}
