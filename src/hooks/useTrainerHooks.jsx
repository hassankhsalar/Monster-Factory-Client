import { useEffect, useState } from "react";

const useTrainerHooks = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trainer data
  useEffect(() => {
    fetch("http://localhost:5000/trainers") // Ensure the correct path to your trainer.json file
      .then((response) => response.json())
      .then(data => {
        setTrainers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching trainer data:", error));
  }, []);
  return [trainers, loading];
};

export default useTrainerHooks;
