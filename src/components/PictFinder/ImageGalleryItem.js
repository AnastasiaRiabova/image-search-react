import React from 'react';

const ImageGalleryItem = ({ images, toGet }) => {
  return images.map(el => (
    <li key={el.id} className="ImageGalleryItem">
      <img
        onClick={() => toGet(el.largeImageURL)}
        src={el.webformatURL}
        alt={el.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  ));
};

export default ImageGalleryItem;
