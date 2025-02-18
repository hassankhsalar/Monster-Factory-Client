import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <Helmet>
        <title>Monster-factory | About Us</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mt-10 text-primary">About Monster-factory</h1>
          <p className="text-lg text-gray-600 mt-4">
            Your ultimate destination to Strength and Fitness.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* About Image */}
          <div className="lg:w-1/2">
            <img
              src="https://i.ibb.co.com/G4GwC84h/White-and-Blue-Photo-Centric-How-To-Fitness-Instagram-Post.jpg"
              alt="gym"
              className="rounded-lg shadow-lg"
            />
          </div>
          {/* About Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold text-secondary mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 mb-6">
              At Monsterfactory, we believe in the power of fitness to inspire, educate, and
              connect. Our mission is to make fitness accessible to everyone, bridging the
              gap between gym and their favorite goals. Whether you're looking for
              Yoga , endurance, or Strength, we have something for everyone.
            </p>
            <h2 className="text-3xl font-semibold text-secondary mb-4">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access to a vast collection of class types across various genres.</li>
              <li>
                User-friendly platform for buying equipments or supplements, booking classes or sharing thoughts on forum.
              </li>
              <li>Interactive features to leave thoughts and discuss on forums.</li>
              <li>Regular updates on New opportunities, discounts, and more.</li>
            </ul>
            <div className="mt-6">
              <Link to='/bookedtrainer' className="p-2 bg-accent text-white py-2 rounded-md hover:bg-fuchsia-400 transition hover:text-white hover:scale-105">
              Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
