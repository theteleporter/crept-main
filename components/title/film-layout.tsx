import { BrowseHeader } from "@/components/updates/header";
import {
  TrailerBanner,
  Banner,
  EpisodeCard,
  Cast,
  MoreLike,
} from "@/components/title/film-component";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { Footer } from "@/components/updates/footer";
import { Upcoming } from "@/components/updates/categories/upcoming";
import { Season } from "@/components/title/film-component";
import { New } from "../updates/new";
import { Skeleton } from "@nextui-org/react";
import { Status } from "@/components/updates/status"

// interface Season {
//   title: string;
//   episodes: Episode[];
// }

interface Episode {
  title: string;
  description: string;
  image: string;
}

interface MoreLike {
  imageUrl: string;
  urlTo: string;
  imageTitle: string;
}

export interface FilmData {
  title: string;
  genres: string[];
  trending?: string;
  description: string;
  release_year: number;
  seasons: number;
  time: number;
  cast: any[];
  bannerImage: string;
  trailers: any[];
  seasonsEpisode: Season[];
  rating: string;
  "more-like": MoreLike[];
}

export default function FilmLayout({ data }: { data: FilmData }) {
  const [showData, setShowData] = useState<FilmData | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setSeasons(data.seasonsEpisode || []);
      setShowData(data);
    }
    setIsLoading(false);
  }, [data]);

  if (!showData) {
    return <Loading />;
  }

  const { cast, genres } = showData;
  const moreLikeData = data["more-like"];
  const starring = cast[0];

  return (
    <div>
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
                seasons: `${showData.seasons} Parts`,
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
            Movie
          </h3>
          <div className="flex gap-3 text-xl font-bold">
            <svg width="1" height="25">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="200"
                stroke="red"
                strokeWidth="3"
              ></line>
            </svg>{" "}
            <span>{showData.title}</span>
          </div>
        </div>

        <div className="my-5">
          {seasons.map((season, index) => (
            <div key={index}>
              <div className="mx-5 md:mx-0 text-lg font-semibold">
                <h3 className="mx-1 md:mx-5">{season.title}</h3>
              </div>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {season.episodes.map((episode, episodeIndex) => (
                    <EpisodeCard key={episodeIndex} episode={episode} />
                  ))}
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
}
