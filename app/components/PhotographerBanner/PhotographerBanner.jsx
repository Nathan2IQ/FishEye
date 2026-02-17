import ContactModal from "./ContactModal";
import Style from "./PhotographerBanner.module.scss";

export default function PhotographerBanner({ photographer }) {
  return (
    <section className={Style.banner}>
      <div className={Style.info}>
        <h2 className={Style.name}>{photographer.name}</h2>
        <p className={Style.location}>
          {photographer.city}, {photographer.country}
        </p>
        <p className={Style.tagline}>{photographer.tagline}</p>
      </div>

      <ContactModal
        className={Style.contact}
        photographerName={photographer.name}
      />

      <img
        className={Style.portrait}
        src={`/${photographer.portrait}`}
        alt={photographer.name}
      />
    </section>
  );
}
