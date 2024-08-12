"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { Image, Skeleton } from "@nextui-org/react";
import NextImage from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BrowseHeader } from "../updates/header";
import { Footer } from "../updates/footer";
import { Jersey_25 } from "next/font/google";
import Link from "next/link";
import { ChevronDownIcon, SlashIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Status } from "@/components/updates/status"

export interface CategoryData {
  title: string;
  bannerImage: string;
  url: string;
  description: string;
  release_year: number;
  rating: string;
  seasons: string;
}

interface GenreData {
  genres: string[];
}

interface CategoryProps {
  data: CategoryData[];
  isLoading: boolean;
  categoryId: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const jersey = Jersey_25({ subsets: ["latin"], weight: "400", preload: true });

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const Category = ({
  data,
  isLoading,
  categoryId,
  currentPage,
  totalPages,
  onPageChange,
}: CategoryProps) => {
  
  const router = useRouter();
  const pathname = usePathname();

 // SWR hook to fetch genres from json file
 const { data: genresData, error: genresError } = useSWR(
  "/api/genres",
  fetcher
);

if (genresError) {
  console.error("Error!", genresError);
}

const formattedCategoryId = categoryId
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  return (
    <>
      <BrowseHeader />
      <div className="mx-4 md:mx-12 lg:mx-12">
        <div className="mx-7 mt-5 mb-3 font-nunito">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={"/browse"}>Browse</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                    Categories <ChevronDownIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="align-start">
                  <ScrollArea className="h-40">
                      {genresData?.map((genre: string, index: number) => (
                        <>
                          <DropdownMenuItem
                            key={index}
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(
                                `/browse/category/${genre.toLowerCase()}`
                              )
                            }
                          >
                            {genre}
                          </DropdownMenuItem>
                          <Separator className="bg-accent/30 lg:hidden" />
                        </>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{formattedCategoryId}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {isLoading ? (
          <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(30)].map(
              (
                _,
                index // 20 placeholder items
              ) => (
                <Card key={index} className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-3 w-3/4 rounded-md">
                        <div className="h-3 w-3/4 rounded-md bg-default-300"></div>
                      </Skeleton>
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-3 w-1/2 rounded-md">
                        <div className="h-3 w-1/2 rounded-md bg-default-300"></div>
                      </Skeleton>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Skeleton className="w-full h-full rounded-md aspect-video">
                        <div className="h-full w-full rounded-md bg-default-300 aspect-video"></div>
                      </Skeleton>
                    </div>
                    <div className="mt-4">
                      <Skeleton className="h-14 w-full rounded-md">
                        <div className="h-14 w-full rounded-md bg-default-300"></div>
                      </Skeleton>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data &&
                data.map((item, index) => (
                  <Link href={item.url} key={index}>
                    <Card className="cursor-pointer border-none shadow-none hover:bg-accent/10 rounded-none">
                      <CardHeader className="pb-2">
                        {isLoading ? (
                          <>
                            <Skeleton className="h-3 w-3/4 rounded-md">
                              <div className="h-3 w-3/4 rounded-md bg-default-300"></div>
                            </Skeleton>
                          </>
                        ) : (
                          <>
                            <CardTitle className="text-2xl scroll-m-20 tracking-tight">
                              <span className={jersey.className}>
                                {item.title}
                              </span>
                            </CardTitle>
                          </>
                        )}
                        {isLoading ? (
                          <>
                            <Skeleton className="h-3 w-1/2 rounded-md">
                              <div className="h-3 w-1/2 rounded-md bg-default-300"></div>
                            </Skeleton>
                          </>
                        ) : (
                          <CardDescription className="flex gap-2">
                            <span>{item.release_year}</span>
                            <span>{item.seasons} Seasons</span>
                            <span>{item.rating}</span>
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video w-full h-full">
                          {isLoading ? (
                            <>
                              <div>
                                <Skeleton className="w-full h-full rounded-md aspect-video">
                                  <div className="h-full w-full rounded-md bg-default-300 aspect-video"></div>
                                </Skeleton>
                              </div>
                            </>
                          ) : (
                            <Image
                              as={NextImage}
                              radius={"none"}
                              className="w-full aspect-video float-left my-4"
                              quality={100}
                              width={0}
                              height={0}
                              src={item.bannerImage}
                              alt={item.title}
                              loading="lazy"
                              unoptimized
                            />
                          )}
                        </div>
                        {isLoading ? (
                          <>
                            <div className="mt-4">
                              <Skeleton className="h-14 w-full rounded-md">
                                <div className="h-14 w-full rounded-md bg-default-300"></div>
                              </Skeleton>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="leading-7">{item.description}</div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </>
        ) : (
          <div className="h-full w-full rounded-none bg-zinc-800 aspect-video text-center my-auto mx-auto flex flex-col justify-center">
            Error!
          </div>
        )}
      </div>
      <div className={"mt-4 mb-10 mx-auto flex w-full justify-center"}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        >
          <PaginationContent>
            <PaginationItem className={"cursor-pointer"}>
              <PaginationPrevious
                className={
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }
                onClick={() => {
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem className={"cursor-pointer"}>
              <PaginationLink
                isActive={currentPage === 1}
                onClick={() => onPageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage > 1 && currentPage < totalPages && (
              <PaginationItem className={"cursor-pointer"}>
                <PaginationLink
                  onClick={() => onPageChange(currentPage)}
                  isActive
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {totalPages > 1 && (
              <PaginationItem className={"cursor-pointer"}>
                <PaginationLink
                  isActive={currentPage === totalPages}
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem className={"cursor-pointer"}>
              <PaginationNext
                className={
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
                onClick={() => {
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Status />
      <Footer />
    </>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  children: React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  children,
}) => {
  return <div>{children}</div>;
};

export default Pagination;
