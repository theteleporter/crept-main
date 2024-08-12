"use client";

import { Category, CategoryData } from "@/components/title/category-layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import NotFound from "@/app/not-found";
import Error from "@/app/error";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Helmet } from 'react-helmet';
import useSWR from 'swr';

// Fetcher function for useSWR (typed explicitly)
const fetcher: (url: string) => Promise<CategoryData[]> = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default function Layout() {
  const { id } = useParams();
  const categoryId = Array.isArray(id) ? id[0] : id;

  const { data, error, isLoading } = useSWR(
    categoryId ? `/api/category/${categoryId}` : null, // Only fetch when categoryId is available
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 30;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = shuffledData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(shuffledData.length / ITEMS_PER_PAGE);

  // Format the category ID
  const formattedCategoryId = decodeURIComponent(categoryId || "")
    .split(' ')
    .map(capitalizeFirstLetter) // Use utility function
    .join(' ');

  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return <Error />;
  }

  return (
    <>
      <Helmet>
        <title>{formattedCategoryId} | Crept Official Site</title>
        <meta name="robots" content="index, follow, max-image-preview:large" />
        {/* Add other metadata here */}
      </Helmet>
      {data ? (
        <Category
          data={itemsToDisplay}
          isLoading={isLoading}
          categoryId={formattedCategoryId}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        <NotFound />
      )}
    </>
  );
}
