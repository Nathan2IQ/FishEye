"use client";

import Style from "./MediaGallery.module.scss";
import { useEffect, useState } from "react";

const LIKED_MEDIA_STORAGE_KEY = "fisheye-liked-media-ids";

const getLikedMediaIds = () => {
  try {
    const storedValue = localStorage.getItem(LIKED_MEDIA_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((value) => Number.isInteger(value));
  } catch {
    return [];
  }
};

const setLikedMediaIds = (ids) => {
  localStorage.setItem(LIKED_MEDIA_STORAGE_KEY, JSON.stringify(ids));
};

export default function Media({ media, onClick, onLikeUpdate }) {
  const [likesCount, setLikesCount] = useState(media.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const likedIds = getLikedMediaIds();
    setIsLiked(likedIds.includes(media.id));
  }, [media.id]);

  const handleLike = async (e) => {
    e.stopPropagation();

    if (isUpdating) {
      return;
    }

    const shouldLike = !isLiked;
    const newLikesCount = shouldLike ? likesCount + 1 : likesCount - 1;

    if (newLikesCount < 0) {
      return;
    }

    setIsUpdating(true);
    setLikesCount(newLikesCount);
    setIsLiked(shouldLike);

    try {
      await onLikeUpdate?.(media.id, newLikesCount);

      const currentLikedIds = getLikedMediaIds();
      const nextLikedIds = shouldLike
        ? Array.from(new Set([...currentLikedIds, media.id]))
        : currentLikedIds.filter((likedMediaId) => likedMediaId !== media.id);

      setLikedMediaIds(nextLikedIds);
    } catch {
      setLikesCount(likesCount);
      setIsLiked(!shouldLike);
    } finally {
      setIsUpdating(false);
    }
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
          onClick={() => onClick?.(media)}
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
            aria-disabled={isUpdating}
            aria-label={isLiked ? "Unlike" : "Like"}
          ></i>
        </p>
      </div>
    </article>
  );
}
