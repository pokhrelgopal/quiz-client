import { cn } from "@/utils/tw-merge";
import { Message, Notification } from "iconsax-react";
import React from "react";
import UserMenu from "./UserMenu";
type AdminNavbarProps = {
  className?: string;
};

const AdminNavbar = ({ className }: AdminNavbarProps) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between">
        <div>Search bar</div>
        <div className="flex items-center space-x-4">
          <Notificaiton />
          <Messages />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;

function Notificaiton() {
  return (
    <div className="cursor-pointer bg-gray-100 rounded-full p-1.5 border border-gray-200">
      <Notification className="size-5 stroke-dark" />
    </div>
  );
}

function Messages() {
  return (
    <div className="cursor-pointer bg-gray-100 rounded-full p-1.5 border border-gray-200">
      <Message className="size-5 stroke-dark" />
    </div>
  );
}
