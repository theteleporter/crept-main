"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Image, Skeleton } from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR from "swr";

interface CategoryData {
  [x: string]: any;
  title: string;
  bannerImage: string;
  url: string;
}

// Fetcher function for useSWR (typed explicitly)
const fetcher: (url: string) => Promise<CategoryData[]> = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  return response.json();
};

export const Category = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  // SWR hook for data fetching and caching
  const { data, error, isLoading } = useSWR(
    params.id ? `/api/category/${params.id}` : null, // Only fetch when params.id is available
    fetcher
  );

  // Shuffle the data (if available)
  const [shuffledData, setShuffledData] = useState<CategoryData[]>([]);
  useEffect(() => {
    if (data) {
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
      }
      setShuffledData(shuffled);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            slidesToScroll: 4,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[...Array(20)].map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3 md:pl-4 aspect-video"
              >
                <Skeleton className="w-full h-full rounded-none aspect-video">
                  <div className="h-full w-full rounded-none bg-default-300 aspect-video"></div>
                </Skeleton>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      ) : error ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            slidesToScroll: 4,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {[...Array(20)].map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3 md:pl-4 aspect-video"
              >
                {/* <Skeleton className="w-full h-full rounded-none aspect-video"> */}
                <div className="h-full w-full rounded-none bg-zinc-800 aspect-video text-center my-auto mx-auto flex flex-col justify-center">
                  Error!
                </div>
                {/* </Skeleton> */}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      ) : (
        // Data available
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            slidesToScroll: 4,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {shuffledData &&
              shuffledData.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3 md:pl-4 aspect-video"
                >
                  <Image
                    onClick={() => router.push(item.url)}
                    as={NextImage}
                    radius={"none"}
                    className="w-full cursor-pointer"
                    quality={100}
                    width={0}
                    height={0}
                    title={item.title}
                    src={item.bannerImage}
                    alt={item.title}
                    loading="lazy"
                    unoptimized
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      )}
    </>
  );
};
