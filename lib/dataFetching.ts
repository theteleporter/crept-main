import axios from 'axios';

export async function fetchFilmDataLayout(filmId: any) {
  try {
    const response = await axios.get(`/api/titles/movie/${filmId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching film data:', error);
    return null;
  }
}

export async function fetchTvShowDataLayout(showId: any) {
  try {
    const response = await axios.get(`/api/titles/tv/${showId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show data:', error);
    return null;
  }
}

export async function fetchCategoryDataLayout(categoryId: any) {
  try {
    const response = await axios.get(`/api/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}

export async function fetchFilmData(filmId: any) {
  try {
    const response = await axios.get(`/api/titles/movie/${filmId}`);
    return {
      lastModified: new Date(response.data.updatedAt).toISOString(),
    };
  } catch (error) {
    console.error('Error fetching film data:', error);
    return null;
  }
}

export async function fetchTvShowData(showId: any) {
  try {
    const response = await axios.get(`/api/titles/tv/${showId}`);
    return {
      lastModified: new Date(response.data.updatedAt).toISOString(), 
    };
  } catch (error) {
    console.error('Error fetching TV show data:', error);
    return null;
  }
}

export async function fetchCategoryData(categoryId: any) {
  try {
    const response = await axios.get(`/api/category/${categoryId}`);
    return {
      lastModified: new Date(response.data.updatedAt).toISOString(),
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}
