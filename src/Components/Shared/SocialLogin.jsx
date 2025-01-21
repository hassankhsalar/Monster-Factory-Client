import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const {googleSignIn} = useContext(AuthContext);

    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                imageURL: "",
                role: "member"
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate(from, { replace: true });
            })

            
        })
    }

    return (
        <div className="flex items-center justify-center">
            <button onClick={handleGoogleSignIn} type="button" className="px-8 flex gap-2 py-2 font-semibold items-center rounded-md border-b-4 hover:bg-green-500 hover:text-white hover:scale-105 border-green-500"><FaGoogle className="text-green-600"></FaGoogle>Login with Google</button>
        </div>
    );
};

export default SocialLogin;