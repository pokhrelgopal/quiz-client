"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Clipboard, Check } from "lucide-react";

const HeroNav = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "http://localhost:3000/quiz";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <header className="bg-zinc-700">
      <div className="mx-auto flex justify-between h-18 max-w-7xl items-center gap-8">
        <Link className="block text-teal-600" href={"/"}>
          <Logo />
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"secondary"}>Refer A Friend</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Refer a Friend</DialogTitle>
                    <DialogDescription>
                      Share the link below with your friend.
                    </DialogDescription>
                    <div className="flex items-center gap-2">
                      <Input
                        disabled
                        className="h-12"
                        value={referralLink}
                        readOnly
                      />
                      <Button className="h-12 w-12" onClick={copyToClipboard}>
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clipboard className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroNav;
