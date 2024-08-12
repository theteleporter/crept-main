"use client";

import { useState } from "react";
import { copyToClipBoard, shareLink } from "@/service/clipBoardService";
import { Button } from "../ui/button";
import { CheckIcon, CopyIcon, Share2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface ShareLinkProps {
    txt: string
}
export const ShareLink = (props: ShareLinkProps) => {
    const [copied, setCopied] = useState(false)
    
    const handleShareLink = async () => {
        try {
            await shareLink(window.location.href, 'Hey, Check out this website CREPT... You can download any Movie or Tv show for free! Don&#39;t miss out.');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            // Reset after 2 seconds
        } catch (error) {
            console.error('Failed to share link:', error);
        }
    }

    return(
        <Button size={"sm"} variant={"link"} onClick={handleShareLink}>
            {copied ? "Link Shared!"  : <ShareTxt text={props.txt} />}
        </Button>
    )
}

interface ShareTxtProps {
text: string
}

export const ShareTxt = (props: ShareTxtProps) => {
    return(
        <>
        <span className="text-sm mr-2">{props.text}</span> <Share2Icon/>
        </>
    )
}

export const ClipBoardCopy = (props: ShareTxtProps) => {

  const [copied, setCopied] = useState(false)
  const [customUrl, setCustomUrl] = useState('https://www.crept.studio')
  
  const handleShareLink = async () => {
      try {
          await shareLink(customUrl, 'Hey, Check out Crept... You can download any Movie or Tv show for free! Don&#39;t miss out.');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          // Reset after 2 seconds
      } catch (error) {
          console.error('Failed to share link:', error);
      }
  }

    return(
        <div>
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <div className="flex gap-2 items-center">
        <span className="text-sm">
        {props.text}  
        </span>
               <Share2Icon />    
        </div>

      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Tell your friends about us.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              onChange={(e) => setCustomUrl(e.target.value)}
              defaultValue={customUrl}
              readOnly
            />
          </div>
          <Button onClick={handleShareLink} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" /> }
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

          </div>
    )
}