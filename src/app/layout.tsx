import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const poppins = Poppins({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Botaniq AI",
  description: "AI Doc For Plants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <Providers>
          {children}
        </Providers>
        </body>
    </html>
  );
}
