import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "医途｜医药职业方向诊断",
  description: "面向医疗、生物、药学与临床背景求职者的职业方向诊断与行动建议。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
