import { Header } from "@/components/updates/header";
import { Jersey_25 } from "next/font/google";
import Link from "next/link";

const jersey = Jersey_25({ subsets: ["latin"], weight: "400", preload: true });
export default function NotFound() {
  return (
    <div className="h-screen">
      <div className="fixed w-full top-0">
        <Header />
      </div>
      <div className="text-center h-screen justify-center align-middle flex flex-col">
        <h1 className="text-4xl md:text-5xl font-black jersey">
          <span className={jersey.className}>Oops! Page Not Found</span>
        </h1>
        <p className="my-7 max-w-xl container text-xl font-nunito nunito font-medium">
          Sorry, but the page you are looking for is either not available or it
          has been removed.
        </p>
        <p className="font-normal text-lg font-nunito nunito">
          Continue to{" "}
          <Link href={"/browse"} className="underline text-[#e50914] font-bold">
            browse
          </Link>
        </p>
      </div>
      <div className="-z-20 h-screen m-0 bg-[url(/site-icons/crept-icon.png)] bg-no-repeat bg-cover bg-center w-full fixed blur-lg top-0"></div>
    </div>
  );
}
