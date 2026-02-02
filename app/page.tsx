import { getAllPhotographers } from "./lib/prisma-db";
import PhotographerGrid from "./components/PhotographerGrid/PhotographerGrid";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <div>
      <main>
        <PhotographerGrid photographers={photographers} />
      </main>
    </div>
  );
}
