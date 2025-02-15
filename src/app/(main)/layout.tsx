import Footer from "@/components/elements/footer";
import React from "react";
import HeroNav from "./_components/HeroNav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <HeroNav />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
