import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full bg-gray-100" lang="en">
      <body className={inter.className + " h-full"}>
        <AuthProvider >
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
