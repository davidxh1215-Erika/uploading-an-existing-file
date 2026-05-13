import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: '全球采购联系人搜索 | 可降解纸袋垃圾袋',
  description:
    '一键 AI 搜索发达国家可降解纸袋、垃圾袋采购商联系人 — VP、Buyer、Global Sourcing、Supply Chain',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
