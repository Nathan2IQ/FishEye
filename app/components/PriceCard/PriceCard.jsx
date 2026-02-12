import Style from "./PriceCard.module.scss";

export default function PriceCard({ price, totalLikes }) {
  return (
    <div aria-label="Card de prix et de likes fixe" className={Style.priceCard}>
      <p>
        {totalLikes} <i className="fa fa-heart"></i>
      </p>
      <p> {price} € / jour</p>
    </div>
  );
}
