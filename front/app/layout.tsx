import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";

export const metadata: Metadata = {
  title: "TransBus",
  description: "Gestão inteligente para um transporte eficiente.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className="h-full"
    >
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}