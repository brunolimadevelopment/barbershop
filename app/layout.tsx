import type { Metadata } from "next";
import AuthProvider from "./_providers/auth";
import { Toaster } from '@/app/_components/ui/sonner'
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbershop",
  description: "Agende um serviço na sua barbearia favorita!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          <div className="flex-1">{children}</div>
          <Toaster />
          <Footer /> 
        </AuthProvider>
      </body>
    </html>
  );
}
