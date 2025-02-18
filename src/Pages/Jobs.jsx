import { Helmet } from "react-helmet-async";

const Jobs = () => {
  const jobListings = [
    {
      id: 1,
      title: "Content Writer",
      location: "Remote",
      type: "Part-Time",
      description:
        "We’re looking for a creative content writer to craft compelling articles and blogs for fitness enthusiasts.",
      requirements: [
        "Excellent writing and storytelling skills.",
        "Passion for books and literature.",
        "Ability to meet deadlines.",
      ],
    },
    {
      id: 2,
      title: "Frontend Developer",
      location: "On-site: Literary City, Knowledge Land",
      type: "Full-Time",
      description:
        "Join our tech team to build and improve the Monster-Factory platform for gym lovers worldwide.",
      requirements: [
        "Experience with React and Tailwind CSS.",
        "Strong problem-solving skills.",
        "Previous experience with responsive design.",
      ],
    },
    {
      id: 3,
      title: "Customer Support Specialist",
      location: "Remote",
      type: "Full-Time",
      description:
        "Provide outstanding support to our customers, helping them with inquiries and issues.",
      requirements: [
        "Strong communication skills.",
        "Empathy and patience.",
        "Familiarity with customer support tools.",
      ],
    },
  ];

  return (
    <div className="bg-base-200 min-h-screen">
      <Helmet>
        <title>Boi-Chai | Careers</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mt-8 text-primary">Careers at Monster-Factory</h1>
          <p className="text-lg text-gray-600 mt-4">
            Join our mission to connect fitness lovers and revolutionize the way
            knowledge is shared. Explore our job opportunities below.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobListings.map((job) => (
            <div key={job.id} className="flex flex-col justify-between bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-secondary mb-4">
                {job.title}
              </h2>
              <p className="text-gray-500 mb-2">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-500 mb-2">
                <strong>Type:</strong> {job.type}
              </p>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <h3 className="font-semibold text-gray-600 mb-2">
                Requirements:
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <button className="btn bg-accent text-white py-2 rounded-md hover:bg-primary transition hover:scale-105">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
