import React from "react";
import Sidebar from "./_components/Sidebar";
import AdminNavbar from "./_components/AdminNavbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Sidebar className="h-screen fixed w-64 bg-dark" />
      <article className="ml-64">
        <AdminNavbar className="py-5 px-10 shadow-sm border-b border-gray-300" />
        <div className="px-10 py-8 bg-background min-h-screen">{children}</div>
      </article>
    </main>
  );
};

export default ProtectedLayout;
