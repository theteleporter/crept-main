"use client";

import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Jersey_25 } from "next/font/google";
const jersey = Jersey_25({ subsets: ["latin"], weight: "400", preload: true });
import React from "react";
import { IframeDialogue } from "../subcomponents/iframe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "@nextui-org/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";

interface BannerProps {
  src: string;
  alt: string;
  title: string;
  details: {
    year: number;
    seasons: string;
    pg: string;
    category: string[];
  };
  starring: string;
  description: string;
  numGenresToShow: number;
}

export const Banner = (props: BannerProps) => {
  const slicedGenres = props.details.category.slice(0, props.numGenresToShow);

  return (
    <div>
      <div className="aspect-video w-full relative">
        <Image
          className="w-full aspect-video h-fit"
          quality={100}
          unoptimized
          width={0}
          height={0}
          src={props.src}
          alt={props.alt}
          loading="eager"
          priority={true}
        />
      </div>

      <div>
        <h2 className="my-4 font-bold text-4xl md:text-5xl">
          <span className={jersey.className}>{props.title}</span>
        </h2>

        <div className="flex justify-start gap-3 scroll-hidden align-middle text-sm font-medium leading-none">
          <h2 className="text-sm">{props.details.year}</h2>
          <h2 className="text-sm">{props.details.seasons}</h2>
          <button className="text-sm outline outline-1 px-1 outline-[#797979] cursor-default">
            {props.details.pg}
          </button>
          <h2 className="inline">
            {slicedGenres.map((genre, index) => (
              <span className="text-sm mx-1" key={index}>
                {genre}
              </span>
            ))}
          </h2>
        </div>
        <p className="text-base lg:text-lg leading-7 [&:not(:first-child)]:mt-4">
          {props.description}
        </p>
        <p className="text-[#797979] text-sm my-3">
          Starring:{" "}
          <span className="text-white font-medium">{props.starring}</span>
        </p>
      </div>
      <h3 className="text-xl md:font-light md:text-2xl font-semibold mt-7 my-3">
        Videos
      </h3>
      <div className="flex gap-3 text-xl font-bold">
        <svg width="1" height="25">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="200"
            stroke="red"
            stroke-width="3"
          ></line>
        </svg>{" "}
        <span>{props.title}</span>
      </div>
    </div>
  );
};

type Seasons = {
  title: string;
  teaserUrl: string;
  trailerUrl: string;
  imageUrl: string;
};

type Trailer = {
  season: Seasons[];
};

type TrailerBannerProps = {
  trailers: Trailer[];
};

export const TrailerBanner: React.FC<TrailerBannerProps> = ({ trailers }) => {
  return (
    <div className="my-4 w-full px-4 md:px-10 lg:px-12">
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {trailers.map((trailer, index) => (
            <React.Fragment key={index}>
              {renderSeason(trailer.season)}
            </React.Fragment>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

const renderSeason = (season: Seasons[]) => {
  return season.map((item, index) => (
    <CarouselItem
      key={index}
      className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-2 md:pl-4"
    >
      <IframeDialogue
        image={{
          imageSrc: item.imageUrl,
          imageAlt: item.title,
        }}
        video={{
          videoSrc: item.trailerUrl,
          videoTitle: item.title,
        }}
        dialogue={{
          dialogueTitle: item.title,
        }}
      />
    </CarouselItem>
  ));
};

interface VideoQuality {
  [quality: string]: string;
}

export type Episode = {
  title: string;
  season: number;
  episodeNumber: number;
  description: string;
  runningTime: string;
  videoQuality: VideoQuality;
  images: {
    thumbnail: string;
    poster: string;
    banner: string;
  };
};

export type Season = {
  title: string;
  episodes: Episode[];
};

type EpisodeCardProps = {
  episode: Episode;
};

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const { toast } = useToast();

  const { title, episodeNumber, description, runningTime, videoQuality } =
    episode;

  const handleDownload = async (quality: string, url: string) => {
    toast({
      title: "Downloading...",
      description: "Your download will begin shortly.",
    });

    const filename = `${title}.S0${episode.season}E${episode.episodeNumber}.${episode.title}.${quality}.WEBDL.x264.Crept.Studio.mkv`;
    const downloadUrl = `/api/download-video?blobUrl=${encodeURIComponent(
      url
    )}&filename=${encodeURIComponent(filename)}`;

    try {
      // Fetch the URL with SAS token from the API
      const response = await fetch(downloadUrl);
      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast({
          title: "Error",
          description: "Unable to fetch download URL.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching download URL:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching the download URL.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Card className="border-none rounded-sm shadow-none">
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-accent-foreground/40">
            <span>Ep {episodeNumber}</span>
            <span className="mx-3">{runningTime}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-accent-foreground/75 leading-7 [&:not(:first-child)]:mt-6">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="hidden md:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-white text-black"
                  size={"sm"}
                  variant="shadow"
                >
                  Download
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Choose Quality
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-center my-3">
                  <div className="flex justify-evenly my-3 w-full max-w-xl">
                    {Object.entries(videoQuality).map(([quality, url]) => (
                      <Button
                        key={quality}
                        variant={"shadow"}
                        className="border rounded-small bg-white text-black font-semibold"
                        size={"md"}
                        onClick={() => handleDownload(quality, url)}
                      >
                        {quality}
                      </Button>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="rounded-small border" variant="light">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger className="flex justify-end" asChild>
                <Button
                  className="bg-white text-black"
                  size={"sm"}
                  variant="shadow"
                >
                  Download
                </Button>
              </DrawerTrigger>
              <DrawerContent className="border-x-0">
                <div className="mx-auto w-full max-w-md text-center flex justify-center">
                  <DrawerHeader>
                    <DrawerTitle>Choose Quality</DrawerTitle>
                  </DrawerHeader>
                </div>
                <div className="flex justify-center my-3">
                  <div className="flex justify-evenly my-3 w-full max-w-xl">
                    {Object.entries(videoQuality).map(([quality, url]) => (
                      <Button
                        key={quality}
                        variant={"light"}
                        className="border rounded-small"
                        size={"md"}
                        onClick={() => handleDownload(quality, url)}
                      >
                        {quality}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mx-auto w-full max-w-md">
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button className="rounded-small border" variant="light">
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

type CastMember = {
  name: string;
  character: string;
};

type CastProps = {
  cast: CastMember[];
};

export const Cast: React.FC<CastProps> = ({ cast }) => {
  return (
    <div className="mx-7 md:mx-12 lg:mx-14">
      <h2 className="text-base font-medium my-2">Cast</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cast.map((member, index) => (
          <li className="text-sm my-2" key={index}>
            <span className="mr-1">{member.name}</span> as{" "}
            <span className="ml-1">{member.character}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface MoreLikeProps {
  showName: string;
  moreLikeData: { imageUrl: string; urlTo: string; imageTitle: string }[];
}

export function MoreLike(props: MoreLikeProps) {
  const router = useRouter();

  return (
    <>
      <div className="my-16 mx-6 md:mx-7 lg:mx-16">
        <h2 className="text-lg font-semibold my-4">
          More like {props.showName}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-3 lg:gap-3">
          {props.moreLikeData.map((title) => (
            <div key={title.imageTitle}>
              <Image
                onClick={() => router.push(title.urlTo)}
                width={0}
                height={0}
                src={title.imageUrl}
                alt={title.imageTitle}
                unoptimized
                className="w-full aspect-video cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
