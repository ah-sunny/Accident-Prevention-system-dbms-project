// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";



const EditRequest = () => {
    const {requestAccidentID} = useParams()
    const requestAccidentIDInt = parseInt(requestAccidentID)
const [editData, setEditData] = useState({})
// console.log("editData",editData)
const { register,  handleSubmit, formState: { errors } } = useForm()
    useEffect(() => {
        axios.get(`http://localhost:4000/get_req_accidentsID?requestAccidentID=${requestAccidentIDInt}`)
            .then(res => {
                setEditData(res.data[0])
                // console.log(res.data[0])
            })
            .catch(err => {
                console.log(err)
            })

    }, [requestAccidentIDInt]);

    const handleUpdate = async (data) => {
        console.log("update", data)
    }




    return (
        <div>
        <div>
            {/* <h1 className="text-3xl mx-auto text-center font-bold border-b-2 pb-3 border-black">Add Unsafe Routes & Accident Details</h1> */}
            <h1 className="text-2xl mx-auto text-center font-bold border-b-2 pb-3 border-black">Update My Request</h1>

            <div className="mt-4">
                <form className="card-body" onSubmit={handleSubmit(handleUpdate)} >
                    {/* 1st row  */}
                    <div className=" flex justify-between gap-5 ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">User Name :</span>
                            </label>
                            <input disabled  type="text" placeholder=" your name" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email :</span>
                            </label>
                            <input disabled  type="email" placeholder="User email" className="input input-bordered" />
                        </div>

                    </div>

                    {/* 2nd line */}

                    <div className=" flex justify-between gap-5 ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input defaultValue={editData?.date} defaultChecked {...register("date", )}  type="text" placeholder="format like that '2022-02-02' " className="input input-bordered" />
                            {errors.date && <span className="text-red-500 text-xs" >Date is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Time</span>
                            </label>
                            <input {...register("time", )} defaultValue={editData?.time} type="text" placeholder="format like that '06:22:10' " className="input input-bordered" />
                            {errors.time && <span className="text-red-500 text-xs" >Time is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input {...register("location", )} defaultValue={editData?.location} type="text" placeholder="Location" className="input input-bordered" />
                            {errors.location && <span className="text-red-500 text-xs" >Location is required</span>}
                        </div>
                    </div>

                    {/* 2 + 1 row  */}
                    <div className=" flex justify-between gap-5 ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">No. of Death </span>
                            </label>
                            <input {...register("deathNumber", )} defaultValue={editData?.deathNumber} type="number" placeholder=" your name" className="input input-bordered" />
                            {errors.deathNumber && <span className="text-red-500 text-xs" >Number of death is required</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text"> Repair Cost</span>
                            </label>
                            <input {...register("repairCost", )} value={editData?.repairCost} type="number" placeholder="repairCost" className="input input-bordered" />
                            {errors.repairCost && <span className="text-red-500 text-xs" >repairCost is required</span>}
                        </div>
                    </div>


                    {/* image row */}
                    <div className=" flex justify-between gap-5 ">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Accident Vehicle</span>
                            </label>
                            <input {...register("vehicleTypes", )} defaultValue={editData?.vehicleTypes} type="text" placeholder="vehicleTypes" className="input input-bordered" />
                            {errors.vehicleTypes && <span className="text-red-500 text-xs" >vehicleTypes is required</span>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Damage Parts :</span>
                            </label>
                            <input {...register("damageParts", )} defaultValue={editData?.damageParts} type="text" placeholder="damageParts" className="textarea textarea-bordered " />
                            {errors.damageParts && <span className="text-red-500 text-xs" >damageParts is required</span>}
                        </div>
                    </div>

                    {/* image row */}
                    <div className=" flex justify-between gap-5 ">


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Image Url</span>
                            </label>
                            <input {...register("image", )} defaultValue={editData?.image} type="text" placeholder="accident locattion image" className="textarea textarea-bordered " />
                            {errors.image && <span className="text-red-500 text-xs" >image is required</span>}
                        </div>
                    </div>
                    {/* 3rd row */}
                    <div className=" flex justify-between gap-5 ">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input {...register("description", )} defaultValue={editData?.description}  type="text" placeholder="accident details " className="textarea textarea-bordered h-20" />
                            {errors.description && <span className="text-red-500 text-xs" >Description is required</span>}
                        </div>
                    </div>
                    <div className="form-control mt-5">
                        <button type="submit" className="btn btn-primary text-lg  "> Send Request </button>
                    </div>

                </form>
            </div>

        </div>
        {/* <ToastContainer></ToastContainer> */}
    </div>

    );
};

export default EditRequest;