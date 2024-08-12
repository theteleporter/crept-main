"use client";

import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GetYear } from "@/lib/utils";
import {
  IconBrandInstagram,
  IconBrandLinktree,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { CaretDownIcon } from "@radix-ui/react-icons";
const items = [
  {
    title: "GitHub",
    url: "https://github.com/theteleporter/crept-main",
  },
  {
    title: "Request a film",
    url: "https://www.contact.crept.studio/request/film",
  },
  {
    title: "Request a feature",
    url: "https://www.contact.crept.studio/request/feature",
  },
  {
    title: "Support Us",
    url: "https://www.support.crept.studio/",
  },
  {
    title: "About Us",
    url: "https://www.info.crept.studio/",
  },
  {
    title: "Feedback",
    url: "https://www.contact.crept.studio/feedback",
  },
  {
    title: "Cookie Policy",
    url: "https://www.info.crept.studio/legal/cookies",
  },
  {
    title: "Corporate Information",
    url: "https://www.info.crept.studio/legal/corporate-info",
  },
  {
    title: "Terms of Service",
    url: "https://www.info.crept.studio/legal/terms-of-service",
  },
  {
    title: "Privacy Policy",
    url: "https://www.info.crept.studio/legal/privacy-policy",
  },
  {
    title: "Report a bug",
    url: "https://www.contact.crept.studio/report/bug",
  },
  {
    title: "Report an issue",
    url: "https://www.contact.crept.studio/report/issue",
  },
  {
    title: "Report a broken link",
    url: "https://www.contact.crept.studio/report/broken-links",
  },
// {
//  title: "RSS",
//  url: "https://www.crept.studio/rss.xml",
//  },
];
export const Footer = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-10 pb-20  mx-7 md:mx-16 lg:mx-20">
        <div className="text-stone-500 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => {
            return (
              <>
                <div className="text-sm" key={index}>
                  <Link className="hover:text-white/50 transition-all ease-out duration-500" href={item.url}>
                    {item.title}
                  </Link>
                </div>
              </>
            );
          })}
          <div>
            <Drawer>
              <div className="">
                <DrawerTrigger asChild>
                  <div className="flex items-center text-stone-500 w-fit text-sm cursor-pointer hover:text-white/50 transition-all ease-out duration-500">
                    Socials <CaretDownIcon />
                  </div>
                </DrawerTrigger>
              </div>
              <DrawerContent className="border-x-0">
                <div className="mx-auto w-full max-w-md text-center flex justify-center">
                  <DrawerHeader>
                    <DrawerTitle>Engage with us</DrawerTitle>
                  </DrawerHeader>
                </div>
                <div className="mx-auto w-full max-w-md">
                  <div className="text-xs text-center w-full"></div>
                  <DrawerIcons />
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="mt-7 mb-4 text-start items-center flex text-stone-500">
          <CopyRight />
        </div>
      </div>
    </>
  );
};

export const HomeFooter = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-10 pb-20  mx-7 md:mx-16 lg:mx-20">
        <div className={"my-4 text-stone-500"}>
          <span
            className={
              "hover:text-white/50 transition-all ease-out duration-500 border-b border-current hover:border-transparent border-spacing-1 w-fit cursor-pointer select-none text-sm"
            }
            onClick={() => router.push("https://www.contact.crept.studio")}
          >
            Questions? Contact Us.
          </span>
        </div>
        <div className="text-stone-500 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => {
            return (
              <>
                <div className="text-sm" key={index}>
                  <Link className="hover:text-white/50 transition-all ease-out duration-500" href={item.url}>
                    {item.title}
                  </Link>
                </div>
              </>
            );
          })}
          <div>
            <Drawer>
              <div className="">
                <DrawerTrigger asChild>
                  <div className="flex items-center text-stone-500 w-fit text-sm cursor-pointer hover:text-white/50 transition-all ease-out duration-500">
                    Socials <CaretDownIcon />
                  </div>
                </DrawerTrigger>
              </div>
              <DrawerContent className="border-x-0">
                <div className="mx-auto w-full max-w-md text-center flex justify-center">
                  <DrawerHeader>
                    <DrawerTitle>Engage with us</DrawerTitle>
                  </DrawerHeader>
                </div>
                <div className="mx-auto w-full max-w-md">
                  <div className="text-xs text-center w-full"></div>
                  <DrawerIcons />
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="mt-7 mb-4 text-start items-center flex text-stone-500">
          <CopyRight />
        </div>
      </div>
    </>
  );
};

export const CopyRight = () => {
  return (
    <>
      <div className="text-center text-xs">
        &copy; Crept, Inc <GetYear />
      </div>
    </>
  );
};

export const DrawerIcons = () => {
  return (
    <>
      <footer className="container flex flex-col gap-5 my-6">
        <div className="flex justify-evenly">
          <Link target="_blank" href={"https://www.reddit.com/u/creptstudio"}>
            <IconBrandReddit className="hover:stroke-stone-500 transition-all ease-out duration-500" />
          </Link>
          <Link target="_blank" href={"https://www.instagram.com/crept.studio"}>
            <IconBrandInstagram className="hover:stroke-stone-500 transition-all ease-out duration-500" />
          </Link>
          <Link target="_blank" href={"https://www.youtube.com/@creptstudio"}>
            <IconBrandYoutube className="hover:stroke-stone-500 transition-all ease-out duration-500" />
          </Link>
          <Link target="_blank" href={"https://www.x.com/@creptstudio"}>
            <IconBrandX className="hover:stroke-stone-500 transition-all ease-out duration-500" />
          </Link>
          <Link target="_blank" href={"https://www.linktr.ee/creptstudio"}>
            <IconBrandLinktree className="hover:stroke-stone-500 transition-all ease-out duration-500" />
          </Link>
          <Link target="_blank" href={"https://www.pinterest.com/creptstudio"}>
            <IconBrandPinterest className="hover:stroke-stone-500 transition-all ease-out duration-500" />
          </Link>
        </div>
      </footer>
    </>
  );
};
