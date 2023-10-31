import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./auth/AuthContext";



export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full bg-gray-100" lang="en">
      <body className="h-full text-base font-crimson">
        <AuthProvider >
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
