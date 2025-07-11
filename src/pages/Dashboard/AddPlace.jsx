import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const AddPlace = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { user } = useAuth()
    const [userInfo, setUserInfo] = useState([])
    // console.log("place: ",userInfo)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/get_user?email=${user.email}`)
            .then(res => {
                setUserInfo(res.data.user)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user.email])


    const handleRequestExperience = async (data) => {
        const userID = userInfo?.userID
        const useremail = userInfo?.email
        const username = userInfo?.name
        const reqInfo = { ...data, userID, useremail, username, status: "pending" }
        // console.log("clicked add butto", useremail)
        // console.log("data : ", reqInfo)

        //send to server
        axios.post(`${import.meta.env.VITE_API_URL}/add_request_accident`, reqInfo)
            .then(res => {
                if (res.data) {
                    // console.log('request sent ', res.data)
                    reset();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'request sent successfully.',
                        showConfirmButton: false,
                        timer: 1200
                    }).then(() => {
                        navigate("/dashboard/my-request");
                    });

                   
                }
            })
            .catch(error => {
                // console.error(error)
                toast.error(`${error.message}`)
            })

        // navigate("/dashboard/my-request");

    }

    return (
        <div className="relative p-5 text-white h-screen w-full" >
            {/* <img src="../../assets/addAccidentBG.jpg" alt="" srcset="" /> 
             style={{ backgroundImage: "url('https://i.ibb.co/TDjLYz7j/blurred-city-street-1.jpg')" }}
            */}
            <div
                className="absolute inset-0 bg-center bg-cover -top-3  bg-gradient-to-r from-red-500 to-blue-500 text-white"

            ></div>
            <div className="relative z-10">
                {/* <h1 className="text-3xl mx-auto text-center font-bold border-b-2 pb-3 border-black">Add Unsafe Routes & Accident Details</h1> */}
                <h1 className="text-2xl mx-auto text-center font-bold border-b-2 border-dashed pb-3 border-white">Request to the admin: Add your experience to the database.</h1>

                <div className="mt-4">
                    <form className="card-body text-white" onSubmit={handleSubmit(handleRequestExperience)} >
                        {/* 1st row  */}
                        <div className=" flex flex-col lg:flex-row justify-between gap-5 ">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-white">User Name :</span>
                                </label>
                                <input disabled defaultValue={userInfo.name} type="text" placeholder=" your name" className="input input-bordered text-black " />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">Email :</span>
                                </label>
                                <input disabled defaultValue={userInfo.email} type="email" placeholder="User email" className="input input-bordered text-black" />
                            </div>

                        </div>

                        {/* 2nd line */}

                        <div className=" flex flex-col lg:flex-row justify-between gap-5 ">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text  text-white">Date</span>
                                </label>
                                <input {...register("date", { required: true })} type="text" placeholder="format like that '2022-02-02' " className="input input-bordered text-black " />
                                {errors.date && <span className="text-red-500 text-xs" >Date is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text  text-white">Time</span>
                                </label>
                                <input {...register("time", { required: true })} type="text" placeholder="format like that '06:22:10' " className="input input-bordered text-black" />
                                {errors.time && <span className="text-red-500 text-xs" >Time is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text  text-white">Location</span>
                                </label>
                                {/* <input {...register("location", { required: true })} type="text" placeholder="Location" className="input input-bordered text-black" /> */}

                                <select {...register("location", { required: true })} className="input input-bordered text-black" >
                                    <option value="Savar">Savar</option>
                                    <option value="RadioColony">RadioColony</option>
                                    <option value="DairyGateJU">DairyGate (JU)</option>
                                    <option value="PrantikJU">Prantik (JU)</option>
                                    <option value="Bismail">Bismail</option>
                                    <option value="Nabinagor">Nabinagor</option>
                                    <option value="Niribili">Niribili</option>
                                    <option value="Gono-U-Turn">Gono-U-Turn</option>
                                    <option value="NITER">NITER</option>

                                </select>



                                {errors.location && <span className="text-red-500 text-xs" >Location is required</span>}
                            </div>
                        </div>

                        {/* 2 + 1 row  */}
                        <div className=" flex flex-col lg:flex-row justify-between gap-5 ">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text  text-white">No. of Death </span>
                                </label>
                                <input {...register("deathNumber", { required: true })} type="number" placeholder="Enter the number of death person" className="input input-bordered text-black" />
                                {errors.deathNumber && <span className="text-red-500 text-xs" >Number of death is required</span>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text  text-white"> Vehicle Number</span>
                                </label>
                                <input {...register("repairCost", { required: true })} type="number" placeholder="vehicle number" className="input input-bordered text-black" />
                                {errors.repairCost && <span className="text-red-500 text-xs" >vegicle is required</span>}
                            </div>
                        </div>


                        {/* image row */}
                        <div className=" flex flex-col lg:flex-row justify-between gap-5 ">

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text  text-white">Accident Vehicle Types</span>
                                </label>
                                <input {...register("vehicleTypes", { required: true })} type="text" placeholder="vehicle : (Bus, Bike, Riskshaw, Van etc)" className="input input-bordered text-black" />
                                {errors.vehicleTypes && <span className="text-red-500 text-xs" >vehicleTypes is required</span>}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text  text-white">Damage Parts :</span>
                                </label>
                                <input {...register("damageParts", { required: true })} type="text" placeholder="damageParts" className="textarea textarea-bordered text-black" />
                                {errors.damageParts && <span className="text-red-500 text-xs" >damageParts is required</span>}
                            </div>
                        </div>

                        {/* image row */}
                        <div className=" flex justify-between gap-5 ">


                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text  text-white">Image Url</span>
                                </label>
                                <input {...register("image", { required: true })} type="text" placeholder="accident locattion image" className="textarea textarea-bordered text-black" />
                                {errors.image && <span className="text-red-500 text-xs" >image is required</span>}
                            </div>
                        </div>
                        {/* 3rd row */}
                        <div className=" flex justify-between gap-5 ">

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text  text-white">Description</span>
                                </label>
                                <input {...register("description", { required: true })} type="text" placeholder="accident details " className="textarea textarea-bordered text-black h-20" />
                                {errors.description && <span className="text-red-500 text-xs" >Description is required</span>}
                            </div>
                        </div>
                        <div className="form-control mt-5">
                            <button type="submit" className="btn btn-primary text-lg  "> Send Request </button>
                        </div>

                    </form>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>


    )
}



