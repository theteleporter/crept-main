import MuxPlayer from "@mux/mux-player-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface VideoInterfaceProps {
  src: string;
  videoTitle: string;
  poster: string;
  metaDataVideoTitle: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
}

export function Video(props: VideoInterfaceProps) {
  return (
    <div>
      <MuxPlayer
        placeholder={"blur"}
        maxResolution={"2160p"}
        className="w-full aspect-video"
        autoPlay={props.autoPlay}
        accentColor="#e50914"
        poster={props.poster}
        src={props.src}
        title={props.videoTitle}
        metadataVideoTitle={props.metaDataVideoTitle}
        loop={props.loop}
        muted={props.muted}
      />
    </div>
  );
}

interface videoDialogueProps {
  image: {
    imageSrc: string;
    imageAlt: string;
  };
  video: {
    videoSrc: string;
    videoTitle: string;
    videoPoster: string;
    metaDataVideoTitle: string;
    autoPlay: boolean;
    loop: boolean;
    muted: boolean;
  };
  dialogue: {
    dialogueTitle: string;
  };
  download: {
    sd: string;
    hd: string;
    fhd: string;
    uhd: string;
  };
}

export function VideoDialogue(props: videoDialogueProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <div className="relative cursor-pointer">
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
            <h5 className="font-light text-base mt-2 mx-1">
              {props.video.videoTitle.slice(0, 15)}...
            </h5>
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
            <Video
              src={props.video.videoSrc}
              videoTitle={props.video.videoTitle}
              autoPlay={props.video.autoPlay}
              poster={props.video.videoPoster}
              metaDataVideoTitle={props.video.metaDataVideoTitle}
              loop={props.video.loop}
              muted={props.video.muted}
            />
          </div>
          <DialogFooter>
            <DropdownMenu>
              <div className="justify-end flex mx-20 mb-4">
                <DropdownMenuTrigger asChild className="outline-none">
                  <Button variant={"outline"}>Download</Button>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className="w-52">
                <DropdownMenuLabel>Choose Your Quality</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <a
                    title={props.video.videoTitle}
                    href={props.download.sd}
                    download={true}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      Standard Definition
                      <DropdownMenuShortcut>480p</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </a>
                  <a
                    title={props.video.videoTitle}
                    href={props.download.hd}
                    download={true}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      High Definition
                      <DropdownMenuShortcut>720p</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </a>
                  <a
                    title={props.video.videoTitle}
                    href={props.download.fhd}
                    download={true}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      Full High Definition
                      <DropdownMenuShortcut>1080p</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </a>
                  <a
                    title={props.video.videoTitle}
                    href={props.download.uhd}
                    download={true}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      Ultra High Definition
                      <DropdownMenuShortcut>2160p</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </a>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
