import { BrowseHeader } from "@/components/updates/header";
import { Footer } from "@/components/updates/footer";
import { BrowseBanner } from "@/components/updates/browse-banner";
import { Category } from "@/components/updates/categories/category";
import { Status } from "@/components/updates/status";

export default function Browse() {
  return (
    <>
      <BrowseHeader />
      <main className="mx-7 md:mx-16 lg:mx-20 mt-1 mb-10">
        <div className="hidden lg:block mb-16">
          <BrowseBanner />
        </div>
        <div className="text-start">
        <h3 className="text-start my-4 font-semibold text-lg">Thrillers</h3>
          <Category params={{
            id: "thriller"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Crime</h3>
          <Category params={{
            id: "crime"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Science Fiction</h3>
          <Category params={{
            id: "science fiction"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Movies</h3>
          <Category params={{
            id: "movie"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Drama</h3>
          <Category params={{
            id: "drama"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Action</h3>
          <Category params={{
            id: "action"
          }} />
         <h3 className="text-start my-4 font-semibold text-lg">Adventure</h3>
          <Category params={{
            id: "adventure"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Horror</h3>
          <Category params={{
            id: "horror"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Mystery</h3>
          <Category params={{
            id: "mystery"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Comedy</h3>
          <Category params={{
            id: "comedy"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Animation</h3>
          <Category params={{
            id: "animation"
          }} />
          <h3 className="text-start my-4 font-semibold text-lg">Supernatural</h3>
          <Category params={{
            id: "supernatural"
          }} />
        </div>
      </main>
      <Status />
      <div>
        <Footer />
      </div>
    </>
  );
}
