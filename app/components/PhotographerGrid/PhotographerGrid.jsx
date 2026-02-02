import PhotographerCard from "../PhotographerCard/PhotographerCard";
import Style from "./PhotographerGrid.module.scss";

export default function PhotographerGrid({ photographers }) {
  return (
    <section className={Style.photographerGrid}>
      {photographers.map((photographer) => (
        <PhotographerCard key={photographer.id} photographer={photographer} />
      ))}
    </section>
  );
}
