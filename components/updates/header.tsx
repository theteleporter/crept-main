"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Icon, Logo } from "../title/icons";
import {
  HamburgerMenuIcon
} from "@radix-ui/react-icons";
import { SearchDialogue } from "@/components/search-dialogue/SearchDialogue";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CopyRight } from "./footer";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  IconBrandInstagram,
  IconBrandLinktree,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

interface Category {
  title: string;
  url: string;
}
interface GenreData {
  genres: string[];
}
const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const Header = () => {
  return (
    <div>
      <header className="fixed bg-black/60 w-full flex justify-between align-middle px-5 py-5 text-center z-50">
        <Logo className="w-36 md:w-40" />
        <div className="hidden md:block">
          <LargeNav />
        </div>
        <div className="flex items-center gap-2">
          <SearchDialogue />
          <SmallNav />
        </div>
      </header>
      <div className="pb-20 md:pb-24"></div>
    </div>
  );
};

export const BrowseHeader = () => {
  const router = useRouter();
  return (
    <div>
      <header className="fixed z-50 bg-black/60 backdrop-blur-sm w-full flex justify-between align-middle px-5 py-5 text-center">
        <div onClick={() => router.push("/browse")}>
          <Logo className="w-36 md:w-40" />
        </div>
        <div className="hidden md:block">
          <LargeNav />
        </div>
        <div className="flex items-center gap-2">
          <SearchDialogue />
          <SmallNav />
        </div>
      </header>
      <div className="pb-20 md:pb-24"></div>
    </div>
  );
};

export const SmallNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: genresData, error: genresError } = useSWR<string[]>(
    "/api/genres",
    fetcher
  );

  if (genresError) {
    console.error("Error fetching genres from JSON:", genresError);
    return <p>Error!</p>; 
  }

  const items = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Browse",
      url: "/browse",
    },
  {
    title: "GitHub",
    url: "https://github.com/theteleporter/crept-main",
  },
    {
      title: "Support Us",
      url: "https://www.support.crept.studio",
    },
  ];

  return (
    <div className="md:hidden z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <HamburgerMenuIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="h-full">
          <SheetHeader>
            <SheetTitle className="flex justify-start">
              <Logo className="w-36" />
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-full">
            <div className="my-10">
              {items.map((item, index) => {
                return (
                  <>
                    <div key={index}>
                      <Link
                        className={cn(
                          "align-middle text-center flex my-4 hover:underline items-center transition-all ease-out duration-700 mx-2",
                          pathname === item.url
                            ? "text-primary"
                            : "text-stone-600 hover:text-primary/70"
                        )}
                        href={item.url}
                      >
                        {item.title}
                      </Link>
                    </div>
                  </>
                );
              })}
              <h2 className="align-middle text-center flex items-center tracking-tight text-primary/40 mx-2 scroll-m-20 font-semibold">
                Categories
              </h2>
              {genresData?.map((genre: string, index: number) => {
                const url = `/browse/category/${genre.toLowerCase()}`;
                return (
                  <>
                    <div key={index}>
                      <Link
                        className={cn(
                          "align-middle text-center flex my-4 hover:underline items-center mx-2 transition-all ease-out duration-700",
                          pathname === url
                            ? "text-primary"
                            : "text-stone-600 hover:text-primary/70"
                        )}
                        href={url}
                      >
                        {genre}
                      </Link>
                    </div>
                  </>
                );
              })}

            </div>
            <footer className="w-full flex flex-col gap-3 my-6 bottom-0">
              <div className="grid grid-cols-3 w-1/2 gap-3 mx-4">
                <Link
                  target="_blank"
                  href={"https://www.reddit.com/u/creptstudio"}
                >
                  <IconBrandReddit className="hover:stroke-white stroke-stone-600" />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.instagram.com/crept.studio"}
                >
                  <IconBrandInstagram className="hover:stroke-white stroke-stone-600" />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.youtube.com/@creptstudio"}
                >
                  <IconBrandYoutube className="hover:stroke-white stroke-stone-600" />
                </Link>
                <Link target="_blank" href={"https://www.x.com/@creptstudio"}>
                  <IconBrandX className="hover:stroke-white stroke-stone-600" />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.linktr.ee/creptstudio"}
                >
                  <IconBrandLinktree className="hover:stroke-white stroke-stone-600" />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.pinterest.com/creptstudio"}
                >
                  <IconBrandPinterest className="hover:stroke-white stroke-stone-600" />
                </Link>
              </div>
              <div className="text-start flex items-center mx-4 mt-4 mb-20 text-stone-600">
                <CopyRight />
              </div>
            </footer>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export function LargeNav() {

  const router = useRouter();
  const pathname = usePathname();

const { data: genresData, error: genresError } = useSWR<string[]>(
  "/api/genres",
  fetcher
);

  if (genresError) {
    console.error("Error fetching genres from JSON:", genresError);
    return <p>Error!</p>;
  }
  const formattedPathname = pathname.toLowerCase()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/browse" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Browse
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Featured</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3 bg-center bg-no-repeat bg-cover rounded-md bg-[url(/assets/images/titles/hit-man/hitman1.jpg)]">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/browse/film/hit-man"
                  >
                    <Icon className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-bold">Hit Man</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    A seasoned hitman&#39;s life takes a comedic turn when he accidentally attends an acting class and discovers a hidden talent for performing. Embracing his newfound passion, he starts auditioning for real roles, leading to unexpected and hilarious consequences.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                className={"text-start"}
                href="/browse/film/atlas"
                title="Atlas"
              >
                When an intelligence analyst uncovers a sinister conspiracy that threatens to wipe out humanity, she must go on the run to try and stop the catastrophic attack.
              </ListItem>
              <ListItem
                className={"text-start"}
                href="/browse/film/i-saw-the-tv-glow"
                title="I saw the Tv glow"
              >
                A classmate introduces teenage Owen to a mysterious late-night TV show -- a vision of a supernatural world beneath their own. In the pale glow of the television, Owen&#39;s view of reality begins to crack.
              </ListItem>
              <ListItem
                className={"text-start"}
                href="/browse/title/datk-matter"
                title="Dark Matter"
              >
                An expert in astrophysics sheds light on the topic of dark matter which has been one of the primary mysteries in modern physics.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-40">
              <ul className="grid w-[200px] gap-2 p-2 md:w-[400px] md:grid-cols-2">
                {genresData?.map((genre: string, index: number) => (
                   <ListItem
                      key={index}
                      title={genre}
                      onClick={() => router.push(`/browse/category/${genre.toLowerCase()}`)}
                      className={"cursor-pointer"}
                      ></ListItem>
                      ))}
              </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ease-out duration-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
