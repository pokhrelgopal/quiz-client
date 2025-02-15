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
import { Clipboard, Check, LogOut, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/api/requests";
import { useLogoutMutation } from "@/lib/api/requests/user.requests";

const HeroNav = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "http://localhost:3000/quiz";

  const logoutMutation = useLogoutMutation();
  const handleLogout = () => logoutMutation.mutate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: 1,
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <header className="bg-zinc-700">
      <div className="mx-auto flex justify-between h-18 p-4 md:p-0 max-w-7xl items-center gap-8">
        <Link className="block text-teal-600" href={"/"}>
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Refer A Friend</Button>
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

          {isLoading ? (
            <Button variant="secondary" disabled>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </Button>
          ) : (
            !error &&
            data && (
              <Button onClick={handleLogout} variant="secondary">
                <LogOut className="h-6 w-6" />
                Logout
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroNav;
