import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ForumPost = () => {
  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    // Fetching the forum posts JSON data
    const fetchForumPosts = async () => {
      const response = await fetch("http://localhost:5000/forums"); // Replace with your actual JSON file path or API endpoint
      const data = await response.json();
      setForumPosts(data);
    };

    fetchForumPosts();
  }, []);

  return (
    <div>
      <section className="">
        <h2 className="text-center text-4xl font-bold">Latest Community Posts</h2>
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          {forumPosts[0] && (
            <a
              rel="noopener noreferrer"
              href="#"
              className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
            >
              <img
                src={forumPosts[0].imageURL}
                alt=""
                className="object-contain w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-sky-500"
              />
              <div className="p-6 space-y-2 lg:col-span-5">
                <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                  {forumPosts[0].title}
                </h3>
                <span className="text-xs dark:text-gray-600">
                  {forumPosts[0].createdAt}
                </span>
                <p>{forumPosts[0].description}</p>
              </div>
            </a>
          )}
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forumPosts.slice(1).map((post) => (
              <a
                key={post._id}
                rel="noopener noreferrer"
                href="#"
                className="max-w-sm rounded-2xl mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 "
              >
                <img
                  role="presentation"
                  className="object-cover w-full rounded-tl-2xl rounded-br-2xl h-44 dark:bg-gray-500"
                  src={post.imageURL}
                  alt={post.title}
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {post.title}
                  </h3>
                  <span className="text-xs dark:text-gray-600">{post.createdAt}</span>
                  <p>{post.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
            >
              <Link to='/communityforums'>Load more posts...
              </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumPost;
