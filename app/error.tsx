"use client";
import { Header } from "@/components/updates/header";
import { Jersey_25 } from "next/font/google";
import Link from "next/link";

const jersey = Jersey_25({ subsets: ["latin"], weight: "400", preload: true });
export default function Error() {
  return (
    <div className="h-screen">
      <div className="fixed w-full top-0">
        <Header />
      </div>
      <div className="text-center h-screen justify-center align-middle flex flex-col">
        <h1 className="text-4xl md:text-5xl font-black jersey">
          <span className={jersey.className}>Oh no! An Error Occurred</span>
        </h1>
        <p className="my-7 max-w-xl container text-xl font-nunito nunito font-medium">
          We apologize for the minor inconvenience caused. We are working very
          hard to resolve the issue.
        </p>
        <p className="font-normal text-lg font-nunito nunito">
          Please proceed to{" "}
          <Link href={"/browse"} className="underline text-[#e50914] font-bold">
            browse
          </Link>
        </p>
      </div>
      <div className="-z-20 h-screen m-0 bg-[url(/site-icons/crept-icon.png)] bg-no-repeat bg-cover bg-center w-full fixed blur-lg top-0"></div>
    </div>
  );
}
