import React from "react";
// import { Carousel } from "react-responsive-3d-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data.js";
import classes from './Carousel.module.css'; 
function CarouselEffect() {
  return (
    <div className={classes.container}>
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showIndicators={false}
        isShadow={true}
        showThumbs={false}
        showArrows={false}
      >
        {/* {img.map((imageItemLink, index) => {
        return <img key={index} src={imageItemLink} alt={`Image ${index + 1}`} />;
      })} */}
         {/* {Object.values(img).map((imageItemLink, index) => {
          return (
            <img key={index} src={imageItemLink} alt={`Image ${index + 1}`} />
          );
        })} */}
         
        {Object.values(img).length >= 0 ? (
           Object.values(img).map((imageItemLink, index) => (
            <img key={index} src={imageItemLink} alt={`Image ${index + 1}`} />
          ))
        ) : (
          <p>No images available.</p> // Fallback UI
        )} 
        console.log(Object.values(img)); 
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
