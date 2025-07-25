
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
    <div className="hero  min-h-screen border-2 border-gray-500 w-auto lg:w-[80%] mx-auto my-8 rounded-md">
      <div className="hero-content flex-col lg:flex-row-reverse bg-no-repeat bg-cover "

      >
        <div className="text-center lg:text-left">
          <img src="https://i.ibb.co.com/TYPyBVN/register.jpg" alt="" className="h-[90%]" />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
          <form className="card-body" onSubmit={handleSubmit(handleRegister)} >
            {/* email field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
              {errors.email && <span className="text-red-500 text-xs mt-1" >Email is required</span>}
            </div>
            {/* password field */}
            <div className="form-control">
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
              <span className='absolute right-[12%] bottom-[59.5%] ' onClick={() => setShowPass(!showPass)}> {showPass ? <FaEyeSlash className="size-6"></FaEyeSlash> : <FaEye className="size-6"></FaEye>} </span>

            </div>

            {/* error handle for password */}

            {errors.password?.type == "minLength" &&
              <span className="text-red-500 text-xs" >Password must have at least 8 characters</span>}
            {errors.password &&
              <span className="text-red-500 text-xs " >{errors.password.message}</span>}


            {/*  confirm password */}
            <div className="form-control">
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
              <span className='absolute right-[12%] bottom-[40.5%] ' onClick={() => setShowPass(!showPass)}> {showPass ? <FaEyeSlash className="size-6"></FaEyeSlash> : <FaEye className="size-6"></FaEye>} </span>

            </div>
            {/* error message */}
            {errors.confirmPass &&
              <span className="text-red-500 text-xs" >{errors.confirmPass.message}</span>}

            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select {...register("role", { required: true, })} className="select select-bordered w-full max-w-xs">
                <option value='normal-user' >normal user</option>
                <option value='admin' >Admin</option>
              </select>
              {
                errors.role && <span> You must select the role</span>
              }
            </div> */}

            <div className="form-control mt-1">
              <button type="submit" className="btn btn-primary ">Register</button>
              <GoogleLogIn></GoogleLogIn>
            </div>
            <p className="text-sm" >Already have an account?
              <Link to='/login' className="text-blue-900 ml-3" >Login</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;