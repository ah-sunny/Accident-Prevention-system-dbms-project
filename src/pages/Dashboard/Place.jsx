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
            axios.get('http://localhost:4000/high-risk-areaRoute')
                .then(res => {
                    setDangerZone(res.data)
                    console.log("request datat: ", res.data)
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
            case "Medium":
                return "bg-yellow-500"; // Yellow for moderate level
            case "Low":
                return "bg-green-500"; // Green for low level
            default:
                return "bg-gray-500"; // Gray for unknown level
        }
    };

    // Function to get reversed danger percentage 
    // const getReversedPercentage = (percentage) => {
    //     const reversed = 100 - percentage;
    //     return reversed.toFixed(2); // Limit to 2 decimal places
    // };


    return (
        <div>
            <h1 className="w-full lg:w-[25%]  mx-auto text-center text-xl lg:text-4xl font-bold italic pb-3 border-b-2 border-dashed border-b-blue-800 mb-2 lg:mb-9 ">Danger Zone</h1>
            <div className="relative">
                 <div className="card items-center shadow-lg space-y-1 lg:space-y-5 mb-2 p-5 w-full lg:w-fit lg:absolute  lg:-right-2 lg:-top-16">
                    {/* <p>hello</p> */}
                    <div className="flex gap-5 italic">
                        <p className="bg-red-800 w-20 pr-5"></p>
                        <p> Danger level : <span className="font-extrabold not-italic text-lg ml-2">HIGH</span> </p>
                    </div>
                    <div className="flex gap-5 italic" >
                        <p className="bg-yellow-500 w-20 lpr-5"></p>
                        <p> Danger level : <span className="font-extrabold not-italic text-lg ml-2">Medium</span></p>
                    </div>
                    <div className="flex gap-5 italic">
                        <p className="bg-green-700 w-20 pr-5"></p>
                        <p> Danger level : <span className="font-extrabold not-italic text-lg ml-2">LOW</span> </p>
                    </div>
                </div>

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



                        <button type="submit" className="btn btn-success text-white hover:text-black bg-red-600 mt-11 w-48 font-bold p-0 text-base flex-shrink " >Show High-Risk Areas</button>
                    </div>
                </form>
                {/* indicator div */}
               
            </div>




            {/* road route  */}

            <div className="mt-16 lg:mt-28">
                {
                    dangerZone.length == 0 ? <>
                        <div className="card border-2 border-red-400 shadow-2xl p-5 lg:p-10 mx-auto text-center lg:w-2/5 bg-base-200 flex flex-col items-center relative">
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
                                            className="h-5 w-5 "
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className={` mb-10 text-end  ${index % 2 === 0 ? "text-start timeline-start" : "text-end timeline-end"
                                            }`}
                                    >
                                      

                                        <div className={`card text-black w-96 ${getBackgroundColor(item.dangerLevel)} `}>
                                            <div className="card-body items-center text-center">
                                                <h2 className="card-title btn btn-outline  text-2xl uppercase mb-5 ">{item?.location}</h2>
                                                <p>Danger Percentage : <span className="text-xl font-extrabold italic">{item?.dangerPercentage}%</span></p>
                                                <p>Danger Level : {item?.dangerLevel}</p>
                                                {/* <div className="w-full absolute -rotate-45 -left-28 text-left top-5 p-3 rounded-md bg-neutral-content ">
                                                    <p>{item?.status}</p>
                                                </div> */}
                                                <p className="font-bold italic">{item?.status}</p>
                                                <div className="card-actions justify-end">
                                                    <Link to={`/dashboard/details-accident/${item.location}`}>
                                                        <button className="btn btn-primary">more info</button>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <hr className="bg-info" />
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