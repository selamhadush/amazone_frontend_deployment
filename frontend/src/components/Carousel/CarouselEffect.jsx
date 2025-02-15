import React from "react";
import { Carousel } from "react-responsive-3d-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data.js";
import classes from "./Carousel.module.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showIndicators={false}
        isShadow={true}
        showThumbs={false}
        showArrows={false}
      >
        {/* {img.map((imageItemLink) => {
          return <img src={imageItemLink} />;
        })} */}
        {Object.values(img).map((imageItemLink, index) => {
          return (
            <img key={index} src={imageItemLink} alt={`Image ${index + 1}`} />
          );
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
