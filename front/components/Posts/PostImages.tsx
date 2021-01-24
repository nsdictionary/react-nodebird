import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

interface IProps {
  images: { src: string }[];
}

const PostImages = ({ images }: IProps) => {
  const [showImagesZoom, setShowImagesZoom] = useState<boolean>(false);
  const imgUri = (src: string) => `http://localhost:3065/${src}`;

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={imgUri(images[0].src)}
          alt={imgUri(images[0].src)}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img
            role="presentation"
            src={imgUri(images[0].src)}
            alt={imgUri(images[0].src)}
            width="50%"
            onClick={onZoom}
          />
          <img
            role="presentation"
            src={imgUri(images[1].src)}
            alt={imgUri(images[1].src)}
            width="50%"
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img
          role="presentation"
          src={imgUri(images[0].src)}
          alt={imgUri(images[0].src)}
          width="50%"
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;
