import Link from "next/link";
import Style from "./PhotographerCard.module.scss";

export default function PhotographerCard({ photographer }) {
  return (
    <div className={Style.wrapper}>
      <Link href={`/photographer/${photographer.id}`}>
        <article className={Style.card}>
          <img
            className={Style.portrait}
            src={photographer.portrait}
            alt={photographer.name}
          />
          <h3 className={Style.name}>{photographer.name}</h3>

          <p className={Style.location}>
            {photographer.city}, {photographer.country}
          </p>
          <p className={Style.tagline}>{photographer.tagline}</p>
          <p className={Style.price}>{photographer.price}€/day</p>
        </article>
      </Link>
    </div>
  );
}
