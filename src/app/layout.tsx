import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Tính điểm | EnderBK's Labs",
  description: "Ứng dụng tính điểm học sinh Việt Nam lớp 6-12 theo Thông tư 22/2021/TT-BGDĐT. Giao diện hiện đại, dễ sử dụng.",
  manifest: "/tinhdiem/manifest.json",
  icons: {
    icon: "/tinhdiem/enderbk'slabs.png",
    apple: "/tinhdiem/enderbk'slabs.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
