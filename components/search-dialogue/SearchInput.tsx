"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import React, { useState } from "react";
import { CaretRightIcon } from "@radix-ui/react-icons";
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandDialog,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { fetcher } from "./fetchers";
import { Item } from "./types";


interface SearchInputProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ open, setOpen, inputRef, handleKeyDown }: SearchInputProps) => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const { data: searchData, error, isLoading } = useSWR(
        "/api/search",
        fetcher
    );

    // Filter and transform data
    const filteredData = React.useMemo<{
        movies: Item[];
        tvShows: Item[];
    }>(() => {
        if (!searchData) return { movies: [], tvShows: [] };
        // Return empty arrays if searchData is null or undefined
        const movies = searchData.filter((item: Item) =>
            item.genres.includes("Movie")
        );
        const tvShows = searchData.filter((item: Item) =>
            item.genres.includes("Tv Show")
        );
        return { movies, tvShows };
    }, [searchData]);

    return (
        <>
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Start typing to search..."
                ref={inputRef}
                onKeyDown={handleKeyDown}
                // onChange={handleInputChange}
            />
            {isLoading || error ? (
                ""
            ) : (
                <CommandEmpty>
                    Oops! Not Available
                    <p>
                        <span
                            onClick={() =>
                                router.push(
                                    "https://www.contact.crept.studio/request/film"
                                )
                            }
                            className="text-xs border-b border-current border-spacing-y-1 hover:border-transparent cursor-pointer transition-all ease-out duration-500"
                        >
                            Request here
                        </span>
                    </p>
                </CommandEmpty>
            )}
            <CommandList>
                {isLoading ? (
                    <CommandEmpty>
                        <div className="flex flex-col justify-center align-middle items-center text-center h-fit m-0 w-full">
                            <div className="m-auto w-16 h-16">
                                <svg
                                    className="m-auto block duration-300 animate-spin delay-0"
                                    shapeRendering={"auto"}
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="xMidYMid"
                                >
                                    <path
                                        d="M18 50A32 32 0 0 0 82 50A32 34 0 0 1 18 50"
                                        className="fill-[#fe0000] stroke-none"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </CommandEmpty>
                ) : error ? (
                    <CommandEmpty>Error fetching search data.</CommandEmpty>
                ) : (
                    <>
                        {/* Conditionally render TV shows if they exist */}
                        {filteredData.tvShows.length > 0 ? (
                            <CommandGroup heading="TV Shows">
                                {filteredData.tvShows.map((item, index) => (
                                    <div
                                        onClick={() => router.push(item.url)}
                                        key={index}
                                    >
                                        <CommandItem className="cursor-pointer">
                                            <CaretRightIcon className="mr-1" />
                                            <span>{item.title}</span>
                                            {item.trending && (
                                                <CommandShortcut>
                                                    {item.trending}
                                                </CommandShortcut>
                                            )}
                                        </CommandItem>
                                    </div>
                                ))}
                            </CommandGroup>
                        ) : (
                            <CommandEmpty>No TV shows found.</CommandEmpty>
                        )}

                        <CommandSeparator />

                        {/* Conditionally render movies if they exist */}
                        {filteredData.movies.length > 0 ? (
                            <CommandGroup heading="Movies">
                                {filteredData.movies.map((item, index) => (
                                    <div
                                        onClick={() => router.push(item.url)}
                                        key={index}
                                    >
                                        <CommandItem className="cursor-pointer">
                                            <CaretRightIcon className="mr-1" />
                                            <span>{item.title}</span>
                                            {item.trending && (
                                                <CommandShortcut>
                                                    {item.trending}
                                                </CommandShortcut>
                                            )}
                                        </CommandItem>
                                    </div>
                                ))}
                            </CommandGroup>
                        ) : (
                            <CommandEmpty>No movies found.</CommandEmpty>
                        )}
                    </>
                )}
            </CommandList>
        </CommandDialog>
    </>
  );
};

export default SearchInput;
