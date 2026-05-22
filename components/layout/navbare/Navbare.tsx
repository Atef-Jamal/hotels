import Link from "next/link";
import NavMenu from "./NavMenu";

import { navLinks } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import LoginRegisterButton from "./LoginRegisterButton";

export default function Navbare() {
  return (
    <div className="flex h-11.5 items-center justify-between bg-[#623af3] px-2 sm:px-4 md:h-16.5 md:px-7">
      <Link href={"/"} className="text-xl font-bold text-white md:text-2xl">
        Hotels.com
      </Link>
      <ul className="hidden items-center justify-center gap-x-1 md:flex">
        {navLinks.map((item) => (
          <li key={item.href}>
            <Button variant={"link"} className={"text-gray-100"}>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          </li>
        ))}
      </ul>
      <LoginRegisterButton />
      <NavMenu />
    </div>
  );
}
