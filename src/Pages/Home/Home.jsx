import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import ForumPost from "./ForumPost";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import TrainerInfo from "./TrainerInfo";
import { Helmet } from "react-helmet-async";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MF || Home</title>
      </Helmet>
      <Banner></Banner>
      <Featured></Featured>
      <AboutUs></AboutUs>
      <FeaturedClasses></FeaturedClasses>
      <Testimonials></Testimonials>
      <ForumPost></ForumPost>
      <Newsletter></Newsletter>
      <TrainerInfo></TrainerInfo>
    </div>
  );
};

export default Home;
