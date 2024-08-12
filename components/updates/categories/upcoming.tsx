import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";

const upcomingData = [
    {
        title: "Sky High",
        "genre": "Movie",
        description: "After falling for Estrella, Ángel, a mechanic from the Madrid suburbs, dives into a world of heists and becomes the target of a relentless detective.",
        
    },
    {
        title: "1899",
        "genre": "Tv Show",
        description: "Immigrants on a steamship travelling from London to New York get caught up in a mysterious riddle after finding a second vessel adrift on the open sea."
    },
    {
        title: "A Quiet Place: Day One",
        "genre": "Movie",
        description: "When New York City comes under attack from an alien invasion, a woman and other survivors try to find a way to safety. They soon learn that they must remain absolutely silent as the mysterious creatures are drawn to the slightest sound.",
        
    },
    {
        title: "Ozark",
        "genre": "Tv Show",
        description: "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.",
        
    },
    {
        title: "A Quiet Place",
        "genre": "Movie",
        description: "A family lives in a world inhabited by blind but sound sensitive creatures who are out to kill people. In order to survive, they are forced to use the sign language to communicate with each other.",
        
    },
    {
        title: "Sweet Tooth",
        "genre": "Tv Show",
        description: "On a perilous adventure in a post-apocalyptic world, a boy who's half-human and half deer searches for a new beginning with a gruff protector."
        
    },

    {
        title: "Forgetting Sarah Marshall",
        "genre": "Movie",
        description: "After his break-up with Sarah, Peter Bretter decides to go for a Hawaiian vacation. However, he is in for a rude shock when he finds out that Sarah has checked in at the same resort as his.",
        
    },
    {
        title: "Top Boy",
        "genre": "Tv Show",
        description: "Two seasoned drug dealers return to the gritty streets of London, but their pursuit of money and power is threatened by a young and ruthless hustler.",
        
    },
    {
        title: "The Blacklist",
        "genre": "Tv Show",
        description: "After turning himself in, a brilliant fugitive offers to help the FBI bag other baddies, but only if rookie profiler Elizabeth Keen is his partner.",
        
    },
    {
        title: "Peaky Blinders",
        "genre": "Tv Show",
        description: "A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost.",
        
    }
].sort(() => Math.random() - 0.5);

export function Upcoming() {
    return(<div className="my-20 mx-1 md:mx-7 lg:mx-10">
        <h2 className="mx-6 text-lg font-semibold">Coming soon</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {upcomingData.map((upcoming) => {
        return <div className="w-full" key={upcoming.title}>

            <Card className="rounded-sm border-none shadow-none">
                <CardHeader className="py-3">
                    <CardTitle className="text-base">
                        {upcoming.title}
                    </CardTitle>
                    <CardDescription>
                        {upcoming.genre}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-2 text-base text-[#797979]">
                    {upcoming.description}
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </div>
    })}</div>
    </div>)
}