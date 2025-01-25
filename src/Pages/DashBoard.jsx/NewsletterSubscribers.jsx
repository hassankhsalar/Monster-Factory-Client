import { Link } from "react-router-dom";
import useNews from "../../hooks/useNews";
import { FaEnvelope } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const NewsletterSubscribers = () => {
  const [newsletters] = useNews();

  return (
    <div>
      <Helmet>
              <title>MF || Newsletter sub</title>
            </Helmet>
      <div className="container mt-8 p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          All Newsletter Subscribers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-base text-left whitespace-nowrap">
            <colgroup>
              <col className="w-16" />
              
              <col className="w-16" />
            </colgroup>
            <thead>
              <tr className="dark:bg-primary">
                <th className="p-3 px-8">Index</th>
                <th className="p-3 px-8">Email</th>
                <th className="p-3 px-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            {newsletters.map((letter, index) => (
              <tbody
                key={letter._id}
                className="border-b dark:bg-gray-50 dark:border-gray-300"
              >
                <tr>
                  <td className="px-8 text-2xl font-medium dark:text-gray-600">
                    {index + 1}
                  </td>

                  <td className="px-8 py-2">
                    <p>{letter.email}</p>
                  </td>
                  <td className="px-8 py-2">
                    <button className="px-4 bg-accent py-1 text-white rounded-lg">
                      <Link to="https://mail.google.com/mail/">
                        <FaEnvelope></FaEnvelope>
                      </Link>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscribers;
