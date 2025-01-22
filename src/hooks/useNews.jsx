import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';

const useNews = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch, data: newsletters=[], isLoading} = useQuery({
        queryKey: ['newsletter'],
        queryFn: async() => {
            const res = await axiosSecure.get('/newsletter');
            return res.data; 
        }
    })
    return[newsletters, refetch, isLoading]
};

export default useNews;