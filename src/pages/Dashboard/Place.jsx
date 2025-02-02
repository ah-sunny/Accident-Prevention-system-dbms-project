import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";


const Place = () => {
    const [dangerZone, setDangerZone] = useState([])


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handlePlace = (data) => {
        console.log(data)
        if (data.place === "savar") {
            axios.get('http://localhost:4000/get_dangerZone')
                .then(res => {
                    setDangerZone(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

        }

    }

    // Function to determine background color based on the level
    const getBackgroundColor = (level) => {
        switch (level) {
            case "High":
                return "bg-red-500"; // Red for high level
            case "Moderate":
                return "bg-yellow-500"; // Yellow for moderate level
            case "Low":
                return "bg-green-500"; // Green for low level
            default:
                return "bg-gray-500"; // Gray for unknown level
        }
    };

    // Function to get reversed danger percentage 
    const getReversedPercentage = (percentage) => {
        const reversed = 100 - percentage;
        return reversed.toFixed(2); // Limit to 2 decimal places
    };


    return (
        <div>
            <h1 className="mx-auto text-center text-4xl font-bold italic pb-5 ">Danger Zone</h1>
            <div>
                <form onSubmit={handleSubmit(handlePlace)} className="form-control">
                    <div className="flex  justify-center gap-5">
                        <div className="">
                            <label className="label text-xl">
                                <span className="">Your Place :</span>
                            </label>
                            <select
                                {...register("place", { required: "You must select your place" })}
                                defaultValue=""
                                className="select select-bordered w-full max-w-xs"
                            >
                                <option value="" disabled>
                                    Select Your Zone
                                </option>
                                <option value="savar">Savar to NITER</option>
                                <option value="mirpur-10">Mirpur-10</option>
                            </select>
                            <div className="mt-1">
                                {errors.place && (
                                    <span className="text-red-500 text-sm ">{errors.place.message}</span>
                                )}
                            </div>
                        </div>



                        <button type="submit" className="btn btn-primary mt-11 w-48 font-bold p-0 text-base flex-shrink " >Show High-Risk Areas</button>
                    </div>
                </form>
            </div>




            {/* road route  */}

            <div className="mt-28">
                {
                    dangerZone.length == 0 ? <>
                        <div className="card shadow-md p-10 mx-auto text-center w-2/5 bg-base-200 flex flex-col items-center relative">
                            <div className="absolute -top-9 ">
                                <FaArrowUp className=" size-16 text-gray-500" />
                            </div>
                            <p className=" mb-4">
                            To view the danger zone, please enter your location in the field at the top. <br /> This will help identify the dangerous areas nearby.
                            </p>
                        </div>
                    </> : <>

                        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                            {dangerZone.map((item, index) => (
                                <li key={index}>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className={` mb-10 text-end ${index % 2 === 0 ? "text-start timeline-start" : "text-end timeline-end"
                                            }`}
                                    >

                                        <div className={`card text-black w-96 ${getBackgroundColor(item.level)} `}>
                                            <div className="card-body items-center text-center">
                                                <h2 className="card-title">{item?.location}</h2>
                                                <p>Danger Percentage : {getReversedPercentage(item.dangerPercentage)}%</p>
                                                <p>Danger Level : {item?.level}</p>
                                                <div className="card-actions justify-end">
                                                    <Link to={`/dashboard/details-accident/${item.location}`}>
                                                        <button className="btn btn-primary">more info</button>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <hr />
                                </li>
                            ))}
                        </ul>

                    </>
                }



            </div>


        </div>
    );
};

export default Place;