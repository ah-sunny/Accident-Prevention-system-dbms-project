import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLogIn from "../../component/GoogleLogIn";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import bgLogin from "../../assets/loginMap.jpg"
// import LoginImage from "../../assets/image-removebg-preview.png"
import profileIcon from "../../assets/iconImage-removebg-preview.png"



const Login = () => {

    const { LogInUser, logOut } = useAuth()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleLogin = (data) => {
        // console.log(data)
        console.log("clicked login button")

        //create user
        LogInUser(data.email, data.password)

            .then((result) => {
                console.log(result.user)
                // toast.success("user log in succesfully")
                navigate('/')
            })
            .catch(error => {
                logOut()
                // console.error(error)
                toast.error(`${error.message}`)
            })

    }


    return (
        <div className="relative hero min-h-screen justify-items-start   ">
            <img src={bgLogin} alt="" className="w-full h-full blur-sm -z-10 fixed" />

            <div className="absolute top-[11%] left-[28%] rounded-full bg-blue-950 h-44 z-50">
                <img src={profileIcon} alt="prf" className="h-full w-full object-fill "/>
            </div>
            <div className="hero-content border-4 border-blue-800 w-72 lg:w-[900px]  my-8 rounded-3xl flex-col lg:flex-row-reverse gap-0  ml-32 p-0 h-auto lg:h-[550px] shadow-2xl">
                {/*  */}
                <div className=" bg-base-300 h-full w-auto lg:w-[50%] rounded-r-3xl ">
                    <img className="h-full w-auto lg:w-[450px] rounded-r-3xl" src="https://i.ibb.co.com/w00DBv9/login-1.jpg" alt="login img"  />
                    {/* <img src={LoginImage} alt="login" className="" /> */}
                </div>
                <div className="card h-full w-auto lg:w-[50%] bg-base-300 shrink-0 border-r-2 border-red-700 rounded-r-none p-3 pt-16 rounded-3xl ">

        <h1 className="mx-auto text-3xl font-bold pt-5 pb-2">Login</h1>

                    <form className="card-body p-0 lg:px-5 pt-2 border-t-2 border-gray-600 border-dashed" onSubmit={handleSubmit(handleLogin)} >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                            
                        </div>
                        {errors.email && <span className="text-red-500 text-xs" >Email is required</span>}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                            </label>
                            <input {...register("password", { required: true, minLength: 6 })} type={showPass ? "text" : "password"} placeholder="password" className="input input-bordered" />


                            {/* show password method */}
                            <span className='absolute right-[4%] bottom-[15%] ' onClick={() => setShowPass(!showPass)}> {showPass ? <FaEyeSlash className="size-6"></FaEyeSlash> : <FaEye className="size-6"></FaEye>} </span>
                        </div>
                        {errors.password?.type == "required" &&
                            <span className="text-red-500 text-xs" >Password is required</span>}
                        {errors.password?.type == "minLength" &&
                            <span className="text-red-500 text-xs" >Password must have at least 6 characters</span>}
                        <div className="form-control mt-1">
                            <button type="submit" className="btn btn-primary text-lg">Login</button>
                            <GoogleLogIn></GoogleLogIn>
                        </div>
                        <div className="mx-auto mt-1">
                        <p className="text-sm" >Create new account
                            <Link to='/register' className="text-blue-900 ml-5 " >     Register</Link>
                        </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* <ToastContainer></ToastContainer> */}
        </div>
    );
};

export default Login;