import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick, lastPicture }) {
  return (
    <div>
      <ul className={css.container}>
        {images.map(
          (
            {
              id,
              urls: { regular, small },
              alt_description,
              likes,
              user: { name },
            },
            index
          ) => {
            const isLast = index === images.length - 1;
            return (
              <li
                key={`${id}-${index}`}
                ref={isLast ? lastPicture : null}
                className={css.wrap}
              >
                <ImageCard
                  src={small}
                  alt={alt_description}
                  onClick={() =>
                    onImageClick({
                      regular,
                      likes,
                      name,
                    })
                  }
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
