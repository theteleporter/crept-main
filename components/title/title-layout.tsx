"use client";

import { BrowseHeader } from "@/components/updates/header";
import {
  TrailerBanner,
  Banner,
  EpisodeCard,
  Cast,
  Episode,
  MoreLike,
} from "@/components/title/title-components";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { Footer } from "@/components/updates/footer";
import { Upcoming } from "@/components/updates/categories/upcoming";
import React from "react";
import { New } from "../updates/new";
import { Skeleton } from "@nextui-org/react";
import { Status } from "@/components/updates/status"

export interface TitleData {
  title: string;
  genres: string[];
  trending?: string;
  description: string;
  release_year: string;
  seasons: number;
  time: number;
  cast: any[];
  bannerImage: string;
  trailers: any[];
  seasonsEpisode: any[];
  rating: string;
  "more-like": { imageUrl: string; urlTo: string; imageTitle: string }[];
}

export default function TitleLayout({ data }: { data: TitleData }) {
  const [showData, setShowData] = useState<any | null>(null);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<any | null>(null);
  const moreLikeData = data["more-like"];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setSeasons(data.seasonsEpisode || []);
      setSelectedSeason(data.seasonsEpisode[0]);
      setShowData(data);
    }
    setIsLoading(false);
  }, [data]);

  if (!showData) {
    return <Loading />;
  }

  const { cast, genres } = showData;
  const starring = cast[0];

  return (
    <>
      <div className="z-50">
        <BrowseHeader />
      </div>
      <div className="mx-5 md:mx-7 lg:mx-10">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-full rounded-none aspect-video">
              <div className="h-full w-full rounded-none bg-default-300 aspect-video"></div>
            </Skeleton>
          </>
        ) : (
          showData && (
            <Banner
              src={showData.bannerImage}
              alt={`Title: ${showData.title}`}
              title={showData.title.toUpperCase()}
              description={showData.description}
              starring={starring.name}
              details={{
                year: showData.release_year,
                seasons: `${showData.seasons} Seasons`,
                pg: `${showData.rating}`,
                category: genres,
              }}
              numGenresToShow={2}
            />
          )
        )}

        <div>
          <TrailerBanner trailers={showData.trailers} />
        </div>
      </div>
      <div className="my-12 mx-1 md:mx-7 lg:mx-10">
        <div className="mx-5 md:mx-0">
          <h3 className="text-xl md:font-light md:text-2xl font-semibold mt-7 my-3">
            Episodes
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
            <span>{showData.title}</span>
          </div>
        </div>

        <div className="my-5">
          <div>
            <select
              title="Select a season"
              className="mx-5 px-2 py-1 border border-zinc-800 rounded-sm shadow-sm text-base font-medium text-foreground bg-background hover:bg-accent focus:outline-none my-3 pr-2"
              value={selectedSeason ? seasons.indexOf(selectedSeason) : -1}
              onChange={(e) =>
                setSelectedSeason(seasons[Number(e.target.value)])
              }
            >
              {seasons.map((season, index) => (
                <option value={index} key={index}>
                  {season.title}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {selectedSeason &&
                (selectedSeason.episodes as Episode[]).map(
                  (episode, episodeIndex) => (
                    <EpisodeCard key={episodeIndex} episode={episode} />
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Cast cast={showData.cast} />
      </div>
      <div>
        <New />
      </div>
      <div>
        <Upcoming />
      </div>
      <Status />
      <div>
        <Footer />
      </div>
    </>
  );
}
