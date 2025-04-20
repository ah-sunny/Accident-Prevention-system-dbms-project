import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";



export const AddPlace = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { user } = useAuth()
    const [userInfo, setUserInfo] = useState([])
    // console.log("place: ",userInfo)

    useEffect(() => {
        axios.get(`http://localhost:4000/get_user?email=${user.email}`)
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
        const reqInfo = { ...data, userID, useremail, username }
        console.log("clicked add butto", useremail)
        console.log("data : ", reqInfo)

        //send to server
        axios.post("http://localhost:4000/add_request_accident", reqInfo)
            .then(res => {
                if (res.data) {
                    console.log('request sent ', res.data)
                    //  reset();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'request sent successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    //  Navigate("/");
                }
            })
            .catch(error => {
                // console.error(error)
                toast.error(`${error.message}`)
            })



    }

    return (
    <div>
        <div>
            {/* <h1 className="text-3xl mx-auto text-center font-bold border-b-2 pb-3 border-black">Add Unsafe Routes & Accident Details</h1> */}
            <h1 className="text-2xl mx-auto text-center font-bold border-b-2 pb-3 border-black">Request to the admin: Add your experience to the database.</h1>

            <div className="mt-4">
                <form className="card-body" onSubmit={handleSubmit(handleRequestExperience)} >
                    {/* 1st row  */}
                    <div className=" flex justify-between gap-5 ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">User Name :</span>
                            </label>
                            <input disabled defaultValue={userInfo.name} type="text" placeholder=" your name" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email :</span>
                            </label>
                            <input disabled defaultValue={userInfo.email} type="email" placeholder="User email" className="input input-bordered" />
                        </div>

                    </div>

                    {/* 2nd line */}

                    <div className=" flex justify-between gap-5 ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input {...register("date", { required: true })} type="text" placeholder="format like that '2022-02-02' " className="input input-bordered" />
                            {errors.date && <span className="text-red-500 text-xs" >Date is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Time</span>
                            </label>
                            <input {...register("time", { required: true })} type="text" placeholder="format like that '06:22:10' " className="input input-bordered" />
                            {errors.time && <span className="text-red-500 text-xs" >Time is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input {...register("location", { required: true })} type="text" placeholder="Location" className="input input-bordered" />
                            {errors.location && <span className="text-red-500 text-xs" >Location is required</span>}
                        </div>
                    </div>

                    {/* 2 + 1 row  */}
                    <div className=" flex justify-between gap-5 ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">No. of Death </span>
                            </label>
                            <input {...register("deathNumber", { required: true })} type="number" placeholder=" your name" className="input input-bordered" />
                            {errors.deathNumber && <span className="text-red-500 text-xs" >Number of death is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text"> Vehicle Number</span>
                            </label>
                            <input {...register("repairCost", { required: true })} type="number" placeholder="vehicle" className="input input-bordered" />
                            {errors.repairCost && <span className="text-red-500 text-xs" >vegicle is required</span>}
                        </div>
                    </div>


                    {/* image row */}
                    <div className=" flex justify-between gap-5 ">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Accident Vehicle Types</span>
                            </label>
                            <input {...register("vehicleTypes", { required: true })} type="text" placeholder="vehicleTypes" className="input input-bordered" />
                            {errors.vehicleTypes && <span className="text-red-500 text-xs" >vehicleTypes is required</span>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Damage Parts :</span>
                            </label>
                            <input {...register("damageParts", { required: true })} type="text" placeholder="damageParts" className="textarea textarea-bordered " />
                            {errors.damageParts && <span className="text-red-500 text-xs" >damageParts is required</span>}
                        </div>
                    </div>

                    {/* image row */}
                    <div className=" flex justify-between gap-5 ">


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Image Url</span>
                            </label>
                            <input {...register("image", { required: true })} type="text" placeholder="accident locattion image" className="textarea textarea-bordered " />
                            {errors.image && <span className="text-red-500 text-xs" >image is required</span>}
                        </div>
                    </div>
                    {/* 3rd row */}
                    <div className=" flex justify-between gap-5 ">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input {...register("description", { required: true })} type="text" placeholder="accident details " className="textarea textarea-bordered h-20" />
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



