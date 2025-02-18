import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="mt-4 mb-48 sm:mb-10" id="aboutus">
      <h2 className="text-6xl text-center ">About Us</h2>
      <div className="flex mt-10 h-96 xl:h-[650px] w-9/12 mx-auto justify-center item-center gap-8">
        <div className="w-1/2 container flex items-center justify-center overflow-hidden bg-orange-600 rounded-3xl">
          <img className="object-contain relative " src="./about-banner.png" alt="" />
          <img className="object-contain hidden md:block w-96 xl:w-[600px] absolute" src="./about-circle-one.png" alt="" />
          
        </div>

        <div className="w-1/2 flex flex-col gap-5 justify-evenly">
          
          <h2 className="text-4xl font-bold text-accent">Welcome To Monster Factory</h2>
          <p>
            Transform your fitness journey with our dynamic platform! Discover
            expert-led classes, personalized workout plans, and community
            support, all designed to help you achieve your health and wellness
            goals. Whether you're a beginner or a seasoned athlete, we have
            something for everyone. Explore, train, and thrive with us!
          </p>
          <button
            type="button"
            className="px-8 py-3 text-center w-44 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
          >
            <Link to='/aboutus'>Explore More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
