"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

interface BannerData {
  bannerImage: string;
  title: string;
  url: string;
  rating: string;
  release_year: number;
  seasons: number;
  genres: string[];
  description: string;
}

const fetcher: (url: string) => Promise<BannerData> = (url) =>
  fetch(url).then((res) => res.json());

export const BrowseBanner = () => {
  const router = useRouter();

  // Fetch and cache data using useSWR with refetching
  const {
    data: banner,
    error,
    isLoading,
  } = useSWR("/api/banner", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 7 * 60 * 1000, // Revalidate every 7 minutes
  });

  if (error) console.error("Error fetching banner data:", error);

  return (
    <div className="relative -z-0 aspect-video w-full h-full">
      {isLoading ? (
        <Skeleton className="w-full h-full rounded-none aspect-video">
          <div className="h-full w-full rounded-none bg-default-300 aspect-video"></div>
        </Skeleton>
      ) : banner ? (
        <>
          <div className="aspect-video w-full h-full">
            <Image
              className="w-full aspect-video h-full rounded-none"
              quality={100}
              width={0}
              height={0}
              src={banner.bannerImage}
              alt={banner.title}
              loading="eager"
              unoptimized
              priority={true}
            />
            <div className="z-30 absolute bg-gradient-to-b w-full h-full top-0 start-0 from-transparent via-black/50 to-black text-start">
              <div className="bottom-28 absolute mx-20 max-w-2xl flex flex-col gap-6">
                <h2 className="font-jersey jersey font-bold text-4xl md:text-5xl lg:text-6xl">
                  {banner.title}
                </h2>
                <div className="flex gap-4 text-base">
                  <span>{banner.release_year}</span>
                  <span>{banner.seasons} Parts</span>
                  <button className="text-xs outline outline-1 px-1 outline-[#797979] cursor-default">
                    {banner.rating}
                  </button>
                  <span>{banner.genres[0]}</span>
                  <span>{banner.genres[1]}</span>
                </div>
                <p className="font-normal text-lg">{banner.description}</p>
                <div>
                  <Button
                    onClick={() => router.push(banner.url)}
                    className="rounded-none font-semibold text-base bg-red-600 text-white"
                    size={"sm"}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="h-full w-full rounded-none bg-zinc-800 aspect-video text-center my-auto mx-auto flex flex-col justify-center">
            Error!
          </div>
        </div>
      )}
    </div>
  );
};
