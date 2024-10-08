import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { IUserData } from "@/utility/Types";
import { useAuth } from "@/utility/context/authContext";
import useWindowsWidth from "@/utility/useWindowsWitdh";

const Navbar = ({ userData }: { userData: IUserData }) => {
  const windowWidth = useWindowsWidth();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();

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

  const conditionWindow = windowWidth > 768;
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [conditionWindow]);

  return (
    <nav id="navbar" className={`bg-color1 ${conditionWindow ? "py-3 px-52 top-0 left-0 right-0" : "right-0 w-3 h-screen"} fixed`}>
      {!conditionWindow && (
        <div className="absolute right-2 top-4">
          <button className="bg-color1 p-1 pr-3 rounded">
            <i>
              <Icon icon={`iconamoon:menu-burger-horizontal-bold`} style={{ fontSize: "2rem" }} />
            </i>
          </button>
        </div>
      )}
      {conditionWindow && (
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`/`} className="text-xl font-semibold">
            TO DO LIST
          </Link>
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <button
                className="text-xl flex items-center"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                User
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
        <div className="absolute top-14 right-44">
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
