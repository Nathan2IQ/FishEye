"use client";

import Style from "./MediaGallery.module.scss";
import { useState } from "react";

export default function Media({ media, onClick }) {
  const [likesCount, setLikesCount] = useState(media.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      // Si pas encore liké, on ajoute un like
      setLikesCount((prev) => prev + 1);
    } else {
      // Si déjà liké, on retire le like
      setLikesCount((prev) => prev - 1);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <article
      key={media.id}
      className={Style.mediaItem}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(media);
        }
      }}
    >
      {media.image ? (
        <img
          onClick={() => onClick?.(media)}
          src={`/${media.image}`}
          alt={media.title}
          className={Style.mediaImage}
        />
      ) : (
        <video
          src={`/${media.video}`}
          className={Style.mediaImage}
          aria-label={media.title}
        />
      )}
      <div className={Style.mediaInfo}>
        <h3>{media.title}</h3>
        <p>
          {likesCount}{" "}
          <i
            className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          ></i>
        </p>
      </div>
    </article>
  );
}
