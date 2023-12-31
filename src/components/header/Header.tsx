import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { BiBellMinus } from "react-icons/bi";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Context/auth.context";
import NavMenu from "../NavMenu/NavMenu";
import { useRouter } from "next/router";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { logOut } = useContext(AuthContext);
  const router = useRouter()

  useEffect(() => {
    const handlerScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handlerScroll);

    return () => removeEventListener("scroll", handlerScroll);
  }, []);

  const Home = () => {
    router.push('/')
  }
  return (
    <header className={`${scrolled && "bg-[#141414]"} transition-all`}>
      <div className="flex items-center space-x-2">
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            alt={"logo"}
            width={56}
            height={56}
            className="object-contain cursor-pointer"
          />
        </Link>

      <NavMenu/>

        <ul className="space-x-4 md:flex hidden">
          <li onClick={Home} className="navLink">Home</li>
          <li className="navLink">Movies</li>
          <li className="navLink">TV Shows</li>
          <li className="navLink">New</li>
          <li className="navLink">Popular</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <BsSearch className="w-6 h-6 cursor-pointer" />
        <p className="hidden lg:inline">Kids</p>
        <BiBellMinus className="h-6 w-6 cursor-pointer" />
        <Link href={"/Account"}>
          <AiOutlineUser className="h-6 w-6 cursor-pointer" />
        </Link>
        <AiOutlineLogout className="h-6 w-6 cursor-pointer" onClick={logOut} />
      </div>
    </header>
  );
};

export default Header;
