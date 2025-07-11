import axios from "axios";
// import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";


const MyRequest = () => {
// const [myRequest, setMyRequest] = useState([]);
const { user } = useAuth()
// const [reFetch, setReFetch] = useState(false)

// useEffect(() => { 
//     axios.get(`${import.meta.env.VITE_API_URL}/get_req_accidents?useremail=${user.email}`)
//     .then(res => {
//         setMyRequest(res.data)
//         // console.log(res.data)
//         setReFetch(false)
//     })
//     .catch(err => {
//         console.log(err)
//     })
//   }, [user.email,reFetch])


const { data: myRequest = [], refetch } = useQuery({
    queryKey: ['myRequest', user.email], // Adding user.email to query key to trigger re-fetch on email change
    queryFn: async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_req_accidents?useremail=${user.email}`);
        return res.data;
    },
    enabled: !!user.email, // Only fetch data if user.email is available
    // refetchOnWindowFocus: false, // Optional: disable auto-refetch when window gains focus
});

// console.log("myRequest",myRequest)


  const handleDelete = (AccidentID) => {
    const requestAccidentID = parseInt(AccidentID)
    console.log("delete",requestAccidentID)

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
  
            axios.delete(`${import.meta.env.VITE_API_URL}/deleteAccidentReq?requestAccidentID=${requestAccidentID}`)
                .then(res => {
                    if (res.data) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Product has been deleted.",
                            icon: "success"
                        });
                        console.log("confirm",res.data)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    });
  
  }
  




    return (
        <div>
            <h1 className="mx-auto text-center text-4xl font-bold italic pb-5  border-b-2 border-dashed border-black">My Request Accident</h1>

            <div className="mt-10">
                {
                    myRequest.length > 0 ? <>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra ">
                                <thead className="bg-gray-200 text-2xl text-black">
                                    <tr>
                                        <th></th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Vehicle</th>
                                        <th>Damage Parts</th>
                                        <th>No. of Death</th>
                                        <th>Repair Cost</th>
                                        {/* <th></th> */}
                                        <th>Delete</th>
                                        <th>Edit</th>
                                        <th>status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myRequest.map((accident, index) =>
                                            <tr key={index} className="text-xl">
                                                <th>{index+1}</th>
                                                <td>{accident?.location}</td>
                                                <td>{accident?.date && moment(accident?.date).format('DD-MM-YYYY')}</td>
                                                <td>{accident?.time && moment(accident?.time, 'HH:mm:ss').format('hh:mm A')}</td>
                                                <td>{accident?.vehicleTypes}</td>
                                                <td>{accident?.damageParts}</td>
                                                <td className="text-red-600 text-center">{accident?.deathNumber}</td>
                                                <td>{accident?.repairCost}</td>
                                                {/* <td> <button  className="btn btn-outline btn-success">show more</button> </td> */}
                                                <td><button onClick={()=>handleDelete(accident?.requestAccidentID)} className="btn btn-error px-5 "> <MdDeleteForever className="size-6" /> </button></td>
                                                <td> <Link to={`/dashboard/edit-request/${accident?.requestAccidentID}`}> <button className="btn btn-success btn-outline px-5 "> <FaRegEdit className="size-6" /> </button> </Link></td>
                                                <td>{accident?.status}</td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>



                    </>
                        :
                        <>
                          
                        <div className="flex justify-center items-center h-96">
                            <p className="text-2xl">No requests found</p>
                        </div>
                        </>
                }


            </div>

        </div>
    );
};

export default MyRequest;