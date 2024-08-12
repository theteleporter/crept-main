import axios from "axios";

interface Item {
    title: string;
    url: string;
    trending?: string;
    genres: string[];
}
// Interface for notification data
interface Notification {
    title: string;
    description: string;
    url: string;
    imgUrl: string;
    imgTitle: string;
}
// Fetcher function for notifications (typed explicitly)
export const notificationsFetcher: (url: string) => Promise<Notification[]> = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

// Fetcher function (typed explicitly)
export const fetcher: (url: string) => Promise<Item[]> = async (url) => {
    const response = await axios.get(url);
    return response.data;
};
