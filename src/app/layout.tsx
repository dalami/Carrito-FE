import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/app/Context/Contexto";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carrito de compras",
  description: "Proyecto Carrito compras M4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      
      <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Nav />
          {children}
          <Footer />
        </body>
        </UserProvider>
      </html>
      </AuthProvider>
  );
}
