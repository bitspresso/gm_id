import Header from "../components/common/header";
import Footer from "../components/common/footer";
import "./globals.css";
import { Inter } from "next/font/google";
import ChildrenWrapper from "../components/common/childrenWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GM ID",
  description: "Community-driven, event-focused identity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChildrenWrapper>
          <Header />
          <div className="bg-black text-white w-full min-h-screen flex justify-center items-center">
            {children}
          </div>
          <Footer />
        </ChildrenWrapper>
      </body>
    </html>
  );
}
