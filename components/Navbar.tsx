import Link from "next/link";
import NavMenu from "./NavMenu";
import LoginRegisterButton from "./LoginRegisterButton";

const Navbar = () => {
  return (
    <div className="flex h-[46px] items-center justify-between bg-[#623af3] px-2 sm:px-4 md:h-[66px] md:px-7">
      <Link href={"/"} className="text-xl font-bold text-white md:text-2xl">
        Hotels.com
      </Link>
      <ul className="flex items-center justify-center gap-x-2">
        <li className="hidden font-medium text-white md:block">
          <Link href={"/"} className="text-xs md:text-base">
            Home
          </Link>
        </li>
        <li className="hidden font-medium text-white md:block">
          <Link href={"/hotels"} className="text-xs md:text-base">
            Hotels
          </Link>
        </li>
        <li className="hidden font-medium text-white md:block">
          <Link href={"/hotels/Details"} className="text-xs md:text-base">
            Hotel Details
          </Link>
        </li>
        <li className="hidden font-medium text-white md:block">
          <Link href={"/bookNew"} className="text-xs md:text-base">
            BookNew
          </Link>
        </li>
        <li className="hidden text-xs font-medium text-white md:block md:text-base">Services</li>
        <li className="hidden text-xs font-medium text-white md:block md:text-base">About</li>
      </ul>
      <LoginRegisterButton />
      <NavMenu />
    </div>
  );
};

export default Navbar;
