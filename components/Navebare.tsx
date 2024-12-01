import Link from "next/link";
import NavMenu from "./NavMenu";
import LoginRegisterButton from "./LoginRegisterButton";

const Navebare = () => {
  return (
    <div className="h-[46px] md:h-[66px] bg-[#623af3] flex items-center justify-between px-2 sm:px-4 md:px-7">
      <p className="font-bold text-xl md:text-2xl text-white">Hotels.com</p>
      <ul className="hidden md:flex items-center justify-center gap-x-8 ">
        <li className="text-white font-medium">
          <Link href={"/"} className="text-xs md:text-base">
            Home
          </Link>
        </li>
        <li className="text-white font-medium">
          <Link href={"/hotels"} className="text-xs md:text-base">
            Hotels
          </Link>
        </li>
        <li className="text-white font-medium">
          <Link href={"/hotels/Details"} className="text-xs md:text-base">
            Hotel Details
          </Link>
        </li>
        <li className="text-white font-medium text-xs md:text-base">
          Services
        </li>
        <li className="text-white font-medium text-xs md:text-base">About</li>
      </ul>
      <LoginRegisterButton />
      <NavMenu />
    </div>
  );
};

export default Navebare;
