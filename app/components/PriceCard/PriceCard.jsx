import Style from "./PriceCard.module.scss";

export default function PriceCard({ price, totalLikes }) {
  return (
    <div aria-label="Card de prix et de likes fixe" className={Style.priceCard}>
      <p>
        {totalLikes} <em className="fa fa-heart"></em>
      </p>
      <p> {price} € / jour</p>
    </div>
  );
}
