'use client';

import axios from 'axios';
import TitleLayout from '@/components/title/title-layout';
import React from 'react';
import Loading from '@/app/loading';
import { useParams } from 'next/navigation';
import Error from '@/app/error';
import { Helmet } from 'react-helmet';
import useSWR from 'swr';

// Fetcher function for useSWR
const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export default function Tv() {
  const { id } = useParams();
  const showId = Array.isArray(id) ? id[0] : id;

  const { data, error, isLoading } = useSWR(
    showId ? `/api/titles/tv/${showId}` : null, // Only fetch when showId is available
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false, // Customize revalidation behavior if needed
    }
  );

  // Format the show ID (if needed)
  const formattedShowId = decodeURIComponent(showId || "")
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Helmet>
        <title>Watch {formattedShowId} | Crept Official Site</title>
        <meta name="robots" content="index, follow, max-image-preview:large" />
        {/* Add other metadata here */}
      </Helmet>
      <TitleLayout data={data} />
    </>
  );
}
