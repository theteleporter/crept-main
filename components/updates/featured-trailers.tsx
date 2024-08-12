"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { OptionalIframeDialogue } from "@/components/subcomponents/iframe";
import { Skeleton } from "@nextui-org/react";
import useSWR from "swr";
import { useState, useEffect } from "react";

interface TrailerData {
  title: string;
  slug: string;
  imgSrc: string;
  altText: string;
  vidSrc: string;
  vidTitle: string;
  type: "film" | "title";
}

const fetcher: (url: string) => Promise<TrailerData[]> = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch trailers.");
  }
  return response.json() as Promise<TrailerData[]>;
};

export const FeaturedTrailers = () => {
  // Fetch data with SWR
  const {
    data: trailers,
    isLoading,
    error,
  } = useSWR("/api/featured-trailers", fetcher);

  // Shuffle the data (if available)
  const [shuffledData, setShuffledData] = useState<TrailerData[]>([]);
  useEffect(() => {
    if (trailers) {
      const shuffled = [...trailers];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
      }
      setShuffledData(shuffled);
    }
  }, [trailers]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
        slidesToScroll: 4,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {isLoading
          ? // Render 40 skeleton items while loading
            [...Array(40)].map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3 md:pl-4 aspect-video"
              >
                <Skeleton className="w-full h-full rounded-none aspect-video">
                  <div className="h-full w-full rounded-none bg-default-300 aspect-video"></div>
                </Skeleton>
              </CarouselItem>
            ))
          : error
          ? // Custom error carousel
            [...Array(20)].map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3 md:pl-4 aspect-video"
              >
                <div className="h-full w-full rounded-none bg-zinc-800 aspect-video text-center my-auto mx-auto flex flex-col justify-center">
                  Error!
                </div>
              </CarouselItem>
            ))
          : // Render shuffledData once data is available
            shuffledData.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3 md:pl-4 aspect-video"
              >
                <OptionalIframeDialogue
                  image={{
                    imageSrc: item.imgSrc,
                    imageAlt: item.altText,
                  }}
                  video={{
                    videoSrc: item.vidSrc,
                    videoTitle: item.vidTitle,
                  }}
                  dialogue={{
                    dialogueTitle: item.vidTitle,
                  }}
                  urlTo={`/browse/${item.type}/${item.slug}`}
                />
              </CarouselItem>
            ))}
      </CarouselContent>

      <div className="hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
