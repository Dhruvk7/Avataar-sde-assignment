import React, { useState } from 'react';
import './Carousel.scss';

import image1 from './image3.svg';
import image2 from './image2.svg';
import image3 from './image1.svg';
import image4 from './image4.svg';
import image5 from './image5.svg';

import prevArrow from './prevArrow.svg';
import nextArrow from './nextArrow.svg';
import blueDot from './blueDot.svg';
import dot from './dot.svg';

const Carousel = () => {
  const imagesArray = [image1, image2, image3, image4, image5];

  const [images, setImages] = useState(imagesArray);
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrev = () => {
    const rotatedArray = [...images];
    const firstItem = rotatedArray.shift();
    rotatedArray.push(firstItem);
    setImages(rotatedArray);
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    const rotatedArray = [...images];
    const lastItem = rotatedArray.pop();
    rotatedArray.unshift(lastItem);
    setImages(rotatedArray);
    setSelectedImage((selectedImage + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <h1>Featured Products</h1>
      <h2>Explore and discover a variety of products</h2>
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image image-${index} ${index === selectedImage ? 'selected' : ''} ${index === 0 || index === 4 ? 'layer-3' : ''} ${index === 1 || index === 3 ? 'layer-2' : ''} ${index === 2 ? 'layer-1' : ''} `}
          >
            <img src={image} alt={`Image ${index + 1}`} />
            <div className="text">Modern kitchen utensils</div>
          </div>
        ))}
      </div>

      <div className="navigation">
        <div className="arrows">
          <img src={prevArrow} alt="Previous" onClick={handlePrev} />
        </div>

        <div className="dots">
          {images.map((_, index) => (
            <img key={index} src={index === selectedImage ? blueDot : dot} alt={`Dot ${index + 1}`} />
          ))}
        </div>

        <div className="arrows">
          <img src={nextArrow} alt="Next" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
