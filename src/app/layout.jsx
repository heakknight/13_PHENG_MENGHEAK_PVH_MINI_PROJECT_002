import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "sileo";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PurelyStore",
  description:
    "Curated skincare, makeup, and fragrance — a student demo storefront.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          {children}
          <Toaster position="top-center" theme="system"/>

        </Provider>
      </body>
    </html>
  );
}
