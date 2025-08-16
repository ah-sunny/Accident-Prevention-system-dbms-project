import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogIn from "../../component/GoogleLogIn";
import useAuth from "../../hooks/useAuth"
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import bgLogin from "../../assets/loginMap.jpg"
import LoginImage from "../../assets/image-removebg-preview.png"

const Register = () => {

    const { createUser } = useAuth()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const handleRegister = (data) => {

        console.log("clicked register butto")
        const name = data.email.split("@")[0]
        const userDetails = {
            name: name,
            email: data.email,
            password: data.password,
            role: "normal-user",
            status: data?.role == "admin" ? "pending" : "approved",

        }
        console.log(userDetails)


        createUser(data.email, data.password)
            .then((res) => {
                console.log(res.user)

                //send to server
                axios.post(`${import.meta.env.VITE_API_URL}/add_user`, userDetails)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            reset();
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            navigate("/");
                        }
                    })
                    .catch(error => {
                        // console.error(error)
                        toast.error(`${error.message}`)
                    })


                // toast.success("user created")
                navigate("/")
                reset()
            })
            .catch(error => {
                toast.error(`${error.message}`)
                // console.error(error)
            })


    }
    return (
        <div className="relative hero min-h-screen justify-items-start   ">
            <img src={bgLogin} alt="" className="w-full h-full blur-sm -z-10 fixed" />

            <motion.div className="hero-content border-4  border-blue-800 w-full md:w-72 lg:w-[900px]  my-8 rounded-3xl flex-col lg:flex-row gap-0  lg:ml-32 p-0 h-auto lg:h-[550px] shadow-2xl"
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                transition={{ duration: 1 }}
            >
                <div className=" hidden lg:block bg-base-300 h-full w-auto lg:w-[50%] rounded-l-3xl ">
                    <img src={LoginImage} alt="login image" className="h-full w-auto lg:w-[450px] rounded-l-3xl "  />
                </div>
                <div className="card h-full w-full lg:w-[50%] bg-base-300 shrink-0 border-l-2 lg:border-red-700 lg:rounded-l-none p-3 pt-16 rounded-3xl ">

                    <h1 className="text-center mx-auto text-2xl lg:text-4xl font-bold font-mono italic pt-0 pb-5 ">Register Your Account</h1>

                    <form className="card-body p-0 lg:px-5 pt-2 border-t-2 border-gray-600 border-dashed " onSubmit={handleSubmit(handleRegister)} >
                        {/* email field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500 text-xs mt-1" >Email is required</span>}
                        </div>
                        {/* password field */}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: 8,
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                        message:
                                            'Password must have uppercase, lowercase, number, and special character.',
                                    },
                                })}
                                type={showPass ? "text" : "password"}
                                placeholder="password" className="input input-bordered" />
                            {/* show password method */}
                            <span className='absolute right-[4%] bottom-[15%] ' onClick={() => setShowPass(!showPass)}> {showPass ? <FaEyeSlash className="size-6"></FaEyeSlash> : <FaEye className="size-6"></FaEye>} </span>

                        </div>

                        {/* error handle for password */}

                        {errors.password?.type == "minLength" &&
                            <span className="text-red-500 text-xs" >Password must have at least 8 characters</span>}
                        {errors.password &&
                            <span className="text-red-500 text-xs " >{errors.password.message}</span>}


                        {/*  confirm password */}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input {...register("confirmPass", {
                                required: 'Password is required',
                                validate: (value) => {
                                    if (watch("password") != value) {
                                        return "password don't match";
                                    }
                                },

                            })} type={showPass ? "text" : "password"}
                                placeholder="Re-enter password" className="input input-bordered" />



                            {/* show password method */}
                            <span className='absolute right-[4%] bottom-[15%] ' onClick={() => setShowPass(!showPass)}> {showPass ? <FaEyeSlash className="size-6"></FaEyeSlash> : <FaEye className="size-6"></FaEye>} </span>

                        </div>
                        {/* error message */}
                        {errors.confirmPass &&
                            <span className="text-red-500 text-xs" >{errors.confirmPass.message}</span>}

                        <div className="form-control mt-1">
                            <button type="submit" className="btn btn-primary ">Register</button>
                            <GoogleLogIn></GoogleLogIn>
                        </div>
                        <p className="text-sm" >Already have an account?
                            <Link to='/login' className="text-blue-900 ml-3" >Login</Link>
                        </p>
                    </form>
                </div>
            </motion.div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;