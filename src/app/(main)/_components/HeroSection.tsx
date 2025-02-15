"use client";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Interview live now.{" "}
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              With Guhuza.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Simply add your resume or job and be instantly connected! We are not
            a job board.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded-sm bg-red-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-3 focus:outline-hidden sm:w-auto"
              href={"/auth/login"}
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
