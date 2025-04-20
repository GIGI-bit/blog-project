import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Logo from "../images/Logo.png";
import Blogo from "../images/B-logo.png";
import MetaBlog from "../images/MetaBlog.png";
import Image from "next/image";

import Link from "next/link";
import "./globals.css";
import ContactText from "@/components/typography/contact-text";
import CategoryList from "@/components/category-list";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Blogs",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Image
                      src={Logo}
                      className="h-7"
                      width={120}
                      height={1}
                      alt="Logo"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="text-gray-600" href="/">
                      Home
                    </Link>
                    <Link className="text-gray-600" href="/">
                      Write a Blog
                    </Link>
                    <Link className="text-gray-600" href="/">
                      My Blogs
                    </Link>
                    <Link className="text-gray-600" href="/">
                      Contact
                    </Link>
                  </div>
                  <input placeholder="Search" />
                  <ThemeSwitcher></ThemeSwitcher>
                  <p>Sign IN</p>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              <footer className="w-full flex flex-col items-center justify-center mx-auto text-center text-xs gap-8 py-1 bg-gray-100">
                <div className="w-full flex  justify-around py-10 mx-auto">
                  <div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-left">About</h3>
                      <p className="text-gray-500 w-[14vw] text-left">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam
                      </p>
                      <div className="text-left">
                        <ContactText forContact="Email">
                          {" "}
                          info@jstemplate.net
                        </ContactText>
                        <ContactText forContact="Phone">
                          {" "}
                          880 123 456 789
                        </ContactText>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-7">
                    <div className="flex flex-col gap-2 text-left">
                      <h3 className="text-black font-medium mb-2">
                        Quick Link
                      </h3>
                      <Link className="text-gray-600" href="/">
                        Home
                      </Link>
                      <Link className="text-gray-600" href="/">
                        Write a Blog
                      </Link>
                      <Link className="text-gray-600" href="/">
                        My Blogs
                      </Link>
                      <Link className="text-gray-600" href="/">
                        Contact
                      </Link>
                    </div>
                    <CategoryList></CategoryList>
                  </div>
                </div>
                <div className="flex justify-between w-[75%] border-t border-gray-300 mx-1 pt-7">
                  <div className="flex gap-4">
                    <Image
                      src={Blogo}
                      className="h-9"
                      width={50}
                      height={1}
                      alt="Logo"
                    />
                    <div className="flex flex-col gap-1">
                      <Image
                        src={MetaBlog}
                        className="h-5"
                        width={80}
                        height={1}
                        alt="Logo"
                      />
                      <p className="font-extralight">
                        © JS Template 2023. All Rights Reserved.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-6">
                      <Link href="/" className="text-gray-600">
                        Terms of Use
                      </Link>
                      <div className="border-l border-gray-400"></div>
                      <Link href="/" className="text-gray-600">
                        Privacy Policy
                      </Link>
                      <div className="border-l border-gray-400"></div>
                      <Link href="/" className="text-gray-600">
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
