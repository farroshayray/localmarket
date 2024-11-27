import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './market_list.module.css'

const PromoCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true} // Use deviceType directly
      autoPlaySpeed={3000}
      slidesToSlide={1}
      keyBoardControl={true}
      customTransition="transform 800ms ease-in-out"
      transitionDuration={800}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-2-px"
    >
    <div className={styles.carouselItem}>
        <img src="https://via.placeholder.com/150" alt="Item 1" className="item-image" />
        <div className={styles.itemContent}>
            <h3 className={styles.h3}>Item 1</h3>
            <p>Description for Item 1</p>
        </div>
    </div>
    <div className={styles.carouselItem}>
        <img src="https://via.placeholder.com/150" alt="Item 2" className="item-image" />
        <div className={styles.itemContent}>
            <h3 className={styles.h3}>Item 2</h3>
            <p>Description for Item 2</p>
        </div>
    </div>
    <div className={styles.carouselItem}>
        <img src="https://via.placeholder.com/150" alt="Item 3" className="item-image" />
        <div className={styles.itemContent}>
            <h3 className={styles.h3}>Item 3</h3>
            <p>Description for Item 3</p>
        </div>
    </div>
    <div className={styles.carouselItem}>
        <img src="https://via.placeholder.com/150" alt="Item 4" className="item-image" />
        <div className={styles.itemContent}>
            <h3 className={styles.h3}>Item 4</h3>
            <p>Description for Item 4</p>
        </div>
    </div>
    <div className={styles.carouselItem}>
        <img src="https://via.placeholder.com/150" alt="Item 5" className="item-image" />
        <div className={styles.itemContent}>
            <h3 className={styles.h3}>Item 5</h3>
            <p>Description for Item 5</p>
        </div>
    </div>
    </Carousel>
  );
};

export default PromoCarousel;
