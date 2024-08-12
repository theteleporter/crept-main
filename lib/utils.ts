import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getVideoID } from "ytdl-core";
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GetYear() {
  return new Date().getFullYear()
}

export function capitalizeFirstLetter(string: any) {
  if(!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


export async function validateAndTransformRemoteUrl(
  urlString: string
): Promise<string> {
  try {
    const url = new URL(urlString);

    if (url.hostname.includes("drive.google.com")) {
      // Handle Google Drive links
      const match = url.pathname.match(/\/file\/d\/([^\/]+)/);
      if (match && match[1]) {
        const fileId = match[1];
        const response = await axios.get(`https://drive.google.com/uc?export=download&id=${fileId}`);
        const videoUrl = response.request.res.responseUrl;
        return videoUrl;
      } else {
        throw new Error("Invalid Google Drive link format");
      }
    } else if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      const videoId = getVideoID(urlString); // Use getVideoID()
      return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      // If it's not a recognized provider, assume it's a direct link
      return urlString;
    }
  } catch (error) {
    throw new Error("Invalid or unsupported URL format");
  }
}
