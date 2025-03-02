import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Featured = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Simulate fetching JSON data
    const fetchClasses = async () => {
      const response = await fetch("featured.json"); 
      const data = await response.json();
      setClasses(data);
    };

    fetchClasses();
  }, []);

  return (
    <div className="dark:bg-gray-800">
      <div className="text-center mt-6 mb-6 dark:bg-gray-800">
        <button className="text-2xl text-accent font-bold"><Link to='/allclasses'>Our Classes</Link></button>
        <h2 className="text-4xl font-semibold dark:text-white">
          Fitness Classes for Every Goal
        </h2>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper dark:bg-gray-800"
      >
        {classes.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-72 xl:h-96 relative">
              <img
                src={item.image}
                alt={item.categoryName}
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute bottom-4 w-11/12 flex flex-col justify-center items-center left-4 bg-black bg-opacity-50 text-white p-4 rounded-md">
                <h2 className="text-xl font-bold">{item.categoryName}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Featured;
