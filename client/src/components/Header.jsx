import React, { useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleClose = () => {
    setOpenUserMenu(false);
  };

  const handleUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className="h-24 lg:h-20 z-40 flex flex-col justify-center gap-1 shadow-md sticky top-0">
      {!(isSearchPage && isMobile) && (
        <div className="mx-auto pt-1 flex px-2 justify-between container items-center">
          {/* Logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                className="hidden lg:block"
                src={logo}
                width={170}
                height={60}
                alt="logo"
              />
              <img
                className="lg:hidden block"
                src={logo}
                width={120}
                height={60}
                alt="logo"
              />
            </Link>
          </div>

          {/* Serach */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login and Cart */}
          <div className="flex">
            <button onClick={handleUser} className="lg:hidden">
              <FaUserCircle size={26} />
            </button>
            <div className="hidden lg:flex justify-center items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex select-none cursor-pointer items-center gap-2"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded min-w-52 p-4 lg:shadow-lg">
                        <UserMenu close={handleClose} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2 ">
                  Login
                </button>
              )}
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 rounded text-white py-3">
                {/**add to cart icon */}
                <div className="animate-bounce">
                  <MdShoppingCart size={28} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container pb-1 lg:hidden mx-auto px-2">
        <Search />
      </div>
    </header>
  );
};

export default Header;
