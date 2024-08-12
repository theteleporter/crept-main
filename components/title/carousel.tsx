import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

interface CarouselSlideProps {
  imgSrc: string;
  imgAlt: string;
  urlTo: string;
}

export const CarouselSlide = (props: CarouselSlideProps) => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
          slidesToScroll: 4,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3 md:pl-4">
            <Link href={props.urlTo}>
              <Image
                className="w-full cursor-pointer"
                quality={100}
                width={0}
                height={0}
                title={props.imgAlt}
                src={props.imgSrc}
                alt={props.imgAlt}
                loading="lazy"
                unoptimized
              />
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
