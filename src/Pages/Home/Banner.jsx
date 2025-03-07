import { Link } from "react-router-dom";

const Banner = () => {

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  

  return (
    <section className="dark:bg-gray-100 dark:text-gray-800 xl:bg-top lg:bg-fixed bg-[url('/banner3.jpg')] bg-cover bg-center">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
        Transform Your Body,
          <span className="text-violet-600 dark:text-violet-600">Transform Your Life!</span>
          
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
        Achieve Your Fitness Goals with Personalized Workouts, Nutrition Plans, and Expert Guidance.!
        </p>
        <div className="flex flex-wrap justify-center">
          <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-600 dark:bg-violet-600 text-white dark:text-slate-900">
            <Link to='/allclasses'>Get started</Link>
          </button>
          <button onClick={() => scrollToSection("aboutus")} className="px-8 py-3 m-2 text-lg border rounded text-white dark:text-gray-900 dark:border-gray-300">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
