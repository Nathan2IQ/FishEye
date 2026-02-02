"use client";

import Style from "./Header.module.scss";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className={Style.header}>
      {/* SEO purpose only */}
      <h1 className={Style.srOnly}>FishEye</h1>
      <Link href="/">
        <Image src={Logo.src} width={200} height={50} alt="FishEye Logo" />
      </Link>
      {isHomePage && <h2 className={Style.subtitle}>Nos photographes</h2>}
    </header>
  );
}
