const Newsletter = () => {
  return (
    <div>
      <div
        className="w-full h-[480px] bg-[url('https://i.ibb.co.com/VjMXWbr/pngtree-large-room-full-of-equipment-in-a-gym-picture-image-2611111.png')] object-center">
        <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
          <h1 className="text-5xl antialiased mt-10 font-semibold leading-none text-center dark:text-accent">
            Get Our Updates
          </h1>
          <p className="pt-2 pb-8 text-xl antialiased text-center dark:text-primary">
            Find out about events and other news
          </p>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="example@email.com"
              className="w-3/5 p-3 rounded-l-lg sm:w-2/3"
            />
            <button
              type="button"
              className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-600 dark:text-gray-50"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
