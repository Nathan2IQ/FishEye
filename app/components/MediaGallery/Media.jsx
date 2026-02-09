"use client";

import Style from "./MediaGallery.module.scss";

export default function Media({ media, onClick }) {
  return (
    <div
      key={media.id}
      className={Style.mediaItem}
      onClick={() => onClick?.(media)}
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
        <p aria-label="likes">{media.likes} ❤️</p>
      </div>
    </div>
  );
}
