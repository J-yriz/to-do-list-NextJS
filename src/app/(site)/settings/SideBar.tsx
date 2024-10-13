"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const SideBar = ({ userId }: { userId: string }) => {
  const pathname = usePathname();

  const sideBarSettings = {
    general: {
      icon: "iconamoon:profile-fill",
      path: `/settings/${userId}`,
    },
    security: {
      icon: "material-symbols:shield",
      path: `/settings/${userId}/security`,
    },
  };

  return (
    <>
      {Object.entries(sideBarSettings).map(([key, { icon, path }]) => (
        <Link className={`flex items-center p-1 rounded ${pathname === path ? "bg-color2/20" : "hover:bg-color2/50"}`} href={path} key={key}>
          <i className="mr-2 text-color3">
            <Icon icon={`${icon}`} style={{ fontSize: "1rem" }} />
          </i>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Link>
      ))}
    </>
  );
};

export default SideBar;
