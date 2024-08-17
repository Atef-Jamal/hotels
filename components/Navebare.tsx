import Link from "next/link";
import NavMenu from "./NavMenu";

const Navebare = () => {
  return (
    <div className="bg-[#623af3] flex items-center justify-between px-2 sm:px-4 md:px-7">
      <p className="font-bold text-xl md:text-2xl text-white">Hotels.com</p>
      <ul className=" hidden md:flex items-center justify-center gap-x-8 ">
        <li className="text-white font-medium">
          <Link href={"/"}> Home</Link>
        </li>
        <li className="text-white font-medium">
          <Link href={"/hotels"}> Hotels</Link>
        </li>
        <li className="text-white font-medium">
          <Link href={"/hotels/Details"}> Hotel Details</Link>
        </li>
        <li className="text-white font-medium">Bookings</li>
        <li className="text-white font-medium">Fitness</li>
      </ul>
      <button className="hidden md:flex text-sm leading-[18px] font-[700] bg-white py-2 px-4 rounded-sm text-blue-900 tracking-wide">
        Sign in / Register
      </button>
      <NavMenu />
    </div>
  );
};

export default Navebare;
