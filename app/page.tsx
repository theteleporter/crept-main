"use client";

import { Button } from "@/components/ui/button";
import { HomeFooter } from "@/components/updates/footer";
import { Header } from "@/components/updates/header";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ShareLink } from "@/components/subcomponents/link-share";
import { Category } from "@/components/updates/categories/category";
import React from "react";
import { FeaturedTrailers } from "@/components/updates/featured-trailers";
import { Status } from "@/components/updates/status";
import { Banner } from "@/components/updates/banner"

export default function Home() {
  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="z-50">
        <Header />
      </div>

      <h2 className="text-center font-bold text-2xl md:text-3xl my-3">
        Unlimited entertainment, your way.
      </h2>
      {/* <Banner /> */}
      <main className="text-left md:text-center mx-7 md:mx-16 lg:mx-20">
        <div className="text-start">
          <h3 className="text-start my-4 font-semibold text-lg">Comedy</h3>
          <Category
            params={{
              id: "comedy",
            }}
          />
          <h3 className="text-start my-4 font-semibold text-lg">Movies</h3>
          <Category
            params={{
              id: "movie",
            }}
          />
        </div>
        <div className="w-full text-start my-6">
          <h2 className="text-start my-4 font-semibold text-lg">
            Featured Videos
          </h2>
          <FeaturedTrailers />
        </div>
        <div className="text-start">
          <h3 className="text-start my-4 font-semibold text-lg">
            Science Fiction
          </h3>
          <Category
            params={{
              id: "science fiction",
            }}
          />
          <h3 className="text-start my-4 font-semibold text-lg">Action</h3>
          <Category
            params={{
              id: "action",
            }}
          />
          <h3 className="text-start my-4 font-semibold text-lg">Horror</h3>
          <Category
            params={{
              id: "horror",
            }}
          />
        </div>
        <div className="my-4 text-end gap-4">
          <Link href={"/browse"}>
            <Button
              size={"default"}
              variant={"outline"}
              className="font-medium text-normal transition-all ease-out duration-500"
            >
              Explore more <ChevronRightIcon />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-start my-5">
          <div className="md:flex justify-start transition-all ease-out duration-500">
            <ShareLink txt={"Share this page"} />
          </div>
        </div>
      </main>
      <Status />
      <HomeFooter />
    </div>
  );
}
