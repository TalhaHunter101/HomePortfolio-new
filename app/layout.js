import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import NavBar from "@/components/common/Nav/Navbar";
import Footer from "@/components/common/Footer/Footer";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Homeportfolio - AI-Powered Property Data Insights for Any UK Property",
  description: "Discover, source, analyse and track any property in seconds, all in one place",
  favicon: "./favicon.ico",
  openGraph: {
    title: "Homeportfolio - AI-Powered Property Data Insights for Any UK Property",
    
    description: "Discover, source, analyse and track any property in seconds, all in one place",
    url: "https://home-portfolio-weld.vercel.app/", 
    images: [
      {
        url: "https://home-portfolio-weld.vercel.app/oggraph.jpeg", // Absolute URL to your image
        width: 1200,
        height: 630,
        alt: "homeportfolio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader />
        <Providers>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <NavBar />
            <Toaster position="bottom-center" />
            {children}
            {/* <Footer /> */}
          </NextThemesProvider>
        </Providers>
      </body>
    </html>
  );
}
