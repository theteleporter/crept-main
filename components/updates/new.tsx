import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from 'next/navigation'

  const titleData = [
    {
        title: "Despicable Me 4",
        urlTo: "/browse/film/despicable-me-4",
        imageUrl: "/assets/images/titles/despicable-me-4/despicableme4-1.jpg",
    },
    {
        title: "Abigail",
        urlTo: "/browse/film/abigail",
        imageUrl: "/assets/images/titles/abigail/abigail1.jpg",
    },
    {
      title: "Bad Hombres",
      urlTo: "/browse/film/bad-hombres",
      imageUrl: "/assets/images/titles/bad-hombres/badhombres1.jpg",
  },
    {
        title: "Bloodline Killer",
        urlTo: "/browse/film/bloodline-killer",
        imageUrl: "/assets/images/titles/bloodline-killer/bloodlinekiller1.jpg",
    },
    {
        title: "Cash Out",
        urlTo: "/browse/film/cash-out",
        imageUrl: "/assets/images/titles/cash-out/cashout1.jpg",
    },
    {
        title: "Cold Meat",
        urlTo: "/browse/film/cold-meat",
        imageUrl: "/assets/images/titles/cold-meat/coldmeat1.jpg",
    },
    {
        title: "Darkness Of Man",
        urlTo: "/browse/film/darkness-of-man",
        imageUrl: "/assets/images/titles/darkness-of-man/darknessofman1.jpg",
    },
    {
        title: "Dunki",
        urlTo: "/browse/film/dunki",
        imageUrl: "/assets/images/titles/dunki/dunki1.jpg",
    },
    {
        title: "End Of The Rope",
        urlTo: "/browse/film/end-of-the-rope",
        imageUrl: "/assets/images/titles/end-of-the-rope/endoftherope1.jpg",
    },
    {
        title: "3 Days In Malay",
        urlTo: "/browse/film/3-days-in-malay",
        imageUrl: "/assets/images/titles/3-days-in-malay/3daysinmalay1.jpg",
    },
    {
        title: "Bad Boys: Ride or Die",
        urlTo: "/browse/film/bad-boys-ride-or-die",
        imageUrl: "/assets/images/titles/bad-boys-ride-or-die/badboysrideordie1.jpg",
    },
    {
        title: "Craig Before The Creek",
        urlTo: "/browse/film/craig-before-the-creek",
        imageUrl: "/assets/images/titles/craig-before-the-creek/craig1.jpg",
    },
    {
        title: "Bursting Point",
        urlTo: "/browse/film/bursting-point",
        imageUrl: "/assets/images/titles/bursting-point/burstingpoint1.jpg",
    },
    {
      title: "Agent Recon",
      urlTo: "/browse/film/agent-recon",
      imageUrl: "/assets/images/titles/agent-recon/agentrecon1.jpg",
  },
  ]

export const New = () => {

    const router = useRouter();

    return (
        <>
         <div className="my-16 mx-6 md:mx-7 lg:mx-16">
        <h2 className="text-lg font-semibold my-4">
          Just added
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-3 lg:gap-3">
          {titleData.map((title, index) => (
            <>
            <div key={index}> 
              <Image
                as={NextImage}
                onClick={() => router.push(title.urlTo)}
                radius={"none"} 
                width={0}
                title={title.title}
                height={0} 
                src={title.imageUrl} 
                alt={title.title} 
                unoptimized
                className="w-full aspect-video cursor-pointer"
              />
            </div>
            </>
          ))}
        </div>
      </div>
        </>
    )
}