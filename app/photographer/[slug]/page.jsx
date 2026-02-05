import PhotographerBanner from "../../components/PhotographerBanner/PhotographerBanner";
import { getPhotographer } from "../../lib/prisma-db";
import { notFound } from "next/navigation";

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

  return (
    <div>
      <PhotographerBanner photographer={photographer} />
    </div>
  );
}
