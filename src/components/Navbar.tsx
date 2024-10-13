"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/utility/context/authContext";
import useWindowsWidth from "@/components/useWindowsWitdh";

const Navbar = () => {
  const windowWidth = useWindowsWidth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isAuthenticated, userData, logout } = useAuth();

  const ProfSettings = {
    settings: {
      func: () => {},
      path: `/settings/${userData.id}`,
      icon: "icon-park-solid:setting-two",
    },
    logout: {
      func: logout,
      path: "",
      icon: "fluent:door-arrow-left-24-filled",
    },
  };

  const conditionWindow = windowWidth > 1024;
  useEffect(() => {
    setIsMenuOpen(false);
  }, [conditionWindow]);

  useEffect(() => {
    if (!conditionWindow) {
      document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    }
  }, [isMenuOpen]);

  return (
    <nav id="navbar" className={`bg-color1 ${conditionWindow ? "py-3 px-52 top-0 sticky" : "right-0 h-screen fixed"}`}>
      {!conditionWindow && (
        <div className={`${isMenuOpen ? "w-72" : "w-3"} transition-all`}>
          <div className={`${isMenuOpen ? "right-[280px]" : "right-1"} top-4 absolute transition-all`}>
            <button className="bg-color1 p-1 pr-3 rounded" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i>
                <Icon icon={`iconamoon:menu-burger-horizontal-bold`} style={{ fontSize: "2rem" }} />
              </i>
            </button>
          </div>
          <div className="mx-5 my-5 sm:my-3 flex flex-col">
            <Link href={`/`} className="text-2xl font-semibold text-center">
              NOTEPAD
            </Link>
            <div className="flex flex-col space-y-2 mt-5">
              {isAuthenticated ? (
                Object.entries(ProfSettings).map(([key, { func, path, icon }]) => (
                  <div key={key}>
                    {path ? (
                      <Link href={`${path}`} className="flex items-center">
                        <i className="mr-2">
                          <Icon icon={`${icon}`} style={{ fontSize: "1rem" }} />
                        </i>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Link>
                    ) : (
                      <button onClick={func} className="flex items-center">
                        <i className="mr-2">
                          <Icon icon={`${icon}`} style={{ fontSize: "1rem" }} />
                        </i>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <Link href={`/register`} className="hover:font-semibold transition-all">
                    Register
                  </Link>
                  <Link href={`/login`} className="hover:font-semibold transition-all">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {conditionWindow && (
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`/`} className="text-xl font-semibold">
            NOTEPAD
          </Link>
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <button
                className="text-xl flex items-center"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                {userData.displayName}
                <i className="ml-1">
                  <Icon icon={`eva:arrow-down-fill`} style={{ fontSize: "1rem" }} />
                </i>
              </button>
            ) : (
              <>
                <Link href={`/login`} className="hover:font-semibold transition-all">
                  Login
                </Link>
                <Link href={`/register`} className="hover:font-semibold transition-all">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {isMenuOpen && conditionWindow && (
        <div className="absolute top-14 right-44" onClick={() => setIsMenuOpen(false)}>
          <ul className="bg-color2 rounded-sm py-2">
            {Object.entries(ProfSettings).map(([key, { func, path, icon }]) => (
              <li key={key} className="hover:bg-color1/50">
                {path ? (
                  <Link href={`${path}`} className="pl-3 pr-16 flex items-center">
                    <i className="mr-2">
                      <Icon icon={`${icon}`} />
                    </i>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                ) : (
                  <button onClick={func} className="pl-3 pr-16 flex items-center">
                    <i className="mr-2">
                      <Icon icon={`${icon}`} />
                    </i>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
