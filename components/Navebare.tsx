const Navebare = () => {
  return (
    <nav className="bg-[rgb(127,94,247)] flex items-center justify-between px-3 sm:px-5 md:px-8 overflow-hidden">
      <p className="font-bold text-2xl text-white">Hotels.com</p>
      <ul className=" hidden md:flex items-center justify-center gap-x-5">
        <li className="text-white font-medium">My Playlist</li>
        <li className="text-white font-medium">Profile</li>
        <li className="text-white font-medium">About</li>
        <li className="text-white font-medium">Bookings</li>
        <li className="text-white font-medium">Fitness</li>
      </ul>
      <div className="flex items-center justify-center gap-2">
        <button className="text-sm leading-[18px] font-[700] bg-white p-2 rounded-sm text-blue-900">
          Sign in / Register
        </button>
      </div>
    </nav>
  );
};

export default Navebare;
