import PhotographerBanner from "../../components/PhotographerBanner/PhotographerBanner";
import PhotographerContent from "../../components/PhotographerContent/PhotographerContent";
import { notFound } from "next/navigation";
import { getPhotographer } from "../../lib/prisma-db";
import { getAllMediasForPhotographer } from "../../lib/prisma-db";
import { updateNumberOfLikes } from "../../lib/prisma-db";

export default async function PhotographerPage({ params }) {
  const { slug } = await params;

  const id = Number(slug);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const photographer = await getPhotographer(id);

  if (!photographer) {
    notFound();
  }

  const handleUpdateLikes = async (mediaId, newNumberOfLikes) => {
    "use server";
    await updateNumberOfLikes(mediaId, newNumberOfLikes);
  };

  return (
    <div>
      <PhotographerBanner photographer={photographer} />
      <PhotographerContent
        photographer={photographer}
        medias={await getAllMediasForPhotographer(id)}
        onLikeUpdate={handleUpdateLikes}
      />
    </div>
  );
}
