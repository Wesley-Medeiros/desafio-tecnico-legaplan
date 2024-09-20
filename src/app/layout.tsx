import type { Metadata } from "next";
import { Inter_Tight } from 'next/font/google';
import "./globals.scss";

const interTight = Inter_Tight({
  subsets: ['latin'], // define os subsets que você deseja
  weight: ['400', '700'], // pode adicionar mais pesos, se necessário
});

export const metadata: Metadata = {
  title: "Gerenciador de tarefas",
  description: "Desafio técnico Legaplan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight} ${interTight}`}>
        {children}
      </body>
    </html>
  );
}
