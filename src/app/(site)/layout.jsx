import { SessionProvider } from "next-auth/react";
import FooterComponent from "../../components/FooterComponent";
import NavbarComponent from "../../components/NavbarComponent";
import { Toaster } from "sileo";

export default function SiteLayout({ children }) {
  return (
    <>
      <SessionProvider>
        <NavbarComponent />
      </SessionProvider>
        <main className="flex-1">{children}</main>
        <Toaster position="top-right" theme="system" />
      <FooterComponent />
    </>
  );
}
