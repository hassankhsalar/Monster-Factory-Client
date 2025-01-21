import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';

const useTrainer = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch, data: trainers=[], isLoading} = useQuery({
        queryKey: ['trainers'],
        queryFn: async() => {
            const res = await axiosSecure.get('/trainers');
            return res.data; 
        }
    })
    return[trainers, refetch, isLoading]
};

export default useTrainer;