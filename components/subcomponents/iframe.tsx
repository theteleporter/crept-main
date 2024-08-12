import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface IframeInterfaceProps {
  src: string;
  videoTitle: string;
}

export function Iframe(props: IframeInterfaceProps) {
  return (
    <>
      <iframe
        width="0"
        height="0"
        className="aspect-video h-full w-full bg-accent"
        src={props.src}
        title={props.videoTitle}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
}

interface iframeDialogueProps {
  image: {
    imageSrc: string;
    imageAlt: string;
  };
  video: {
    videoSrc: string;
    videoTitle: string;
  };
  dialogue: {
    dialogueTitle: string;
  };
}

export function IframeDialogue(props: iframeDialogueProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <div className="relative cursor-pointer">
              <Image
                loading="lazy"
                className="w-full h-full aspect-[16/9] rounded-none cursor-pointer -z-10"
                quality={100}
                unoptimized
                src={props.image.imageSrc}
                width={0}
                height={0}
                alt={props.image.imageAlt}
              />
              <div className="absolute bottom-4 left-3 z-10">
                <svg className="w-9 h-9" viewBox="0 0 50 50">
                  <g fill="none" fill-rule="nonzero">
                    <path
                      fill="#fff"
                      d="M25 50C11.2 50 0 38.8 0 25S11.2 0 25 0s25 11.2 25 25-11.2 25-25 25z"
                    ></path>
                    <path fill="#000" d="M35.3 25l-15.6-8.6v17.2z"></path>
                  </g>
                </svg>
              </div>
            </div>

            <h5 className="font-light text-base mt-2 mx-1">
              {props.video.videoTitle.slice(0, 15)}...
            </h5>
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 border-none bg-black/0">
          <DialogHeader>
            <DialogTitle className="text-start pt-4 flex gap-3 items-center mx-4">
              <svg width="4" height="20">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="200"
                  stroke="red"
                  stroke-width="3"
                ></line>
              </svg>{" "}
              {props.dialogue.dialogueTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <iframe
              width="0"
              height="0"
              className="aspect-video h-full w-full bg-accent"
              src={props.video.videoSrc}
              title={props.video.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <DialogFooter>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface OptionalIframeDialogue {
  image: {
    imageSrc: string;
    imageAlt: string;
  };
  video: {
    videoSrc: string;
    videoTitle: string;
  };
  dialogue: {
    dialogueTitle: string;
  };
  urlTo: string;
}

export function OptionalIframeDialogue(props: OptionalIframeDialogue) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <div className="relative">
              <Image
                loading="lazy"
                className="w-full h-full aspect-[16/9] rounded-none cursor-pointer z-0"
                quality={100}
                unoptimized
                src={props.image.imageSrc}
                width={0}
                height={0}
                alt={props.image.imageAlt}
              />
              <div className="absolute bottom-4 left-3 z-10">
                <svg className="w-9 h-9" viewBox="0 0 50 50">
                  <g fill="none" fill-rule="nonzero">
                    <path
                      fill="#fff"
                      d="M25 50C11.2 50 0 38.8 0 25S11.2 0 25 0s25 11.2 25 25-11.2 25-25 25z"
                    ></path>
                    <path fill="#000" d="M35.3 25l-15.6-8.6v17.2z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="p-0  border-none bg-black/0">
          <DialogHeader>
            <DialogTitle className="text-start pt-4 flex gap-3 items-center mx-4">
              <svg width="4" height="20">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="200"
                  stroke="red"
                  stroke-width="3"
                ></line>
              </svg>{" "}
              {props.dialogue.dialogueTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <iframe
              width="0"
              height="0"
              className="aspect-video h-full w-full bg-accent"
              src={props.video.videoSrc}
              title={props.video.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <DialogFooter>
            <div className="justify-end flex mx-20 mb-4">
              <Link
                className="text-base font-normal underline hover:no-underline flex items-center w-fit"
                href={props.urlTo}
              >
                Explore <ChevronRightIcon />
              </Link>
            </div>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
