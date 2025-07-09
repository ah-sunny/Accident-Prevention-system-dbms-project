import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";


const AllReqAccident = () => {


    const { data: AllReqData = [],refetch } = useQuery({
        queryKey: ['AllReqData',], 
        queryFn: async () => {
            const res = await axios.get(`http://localhost:4000/get_allReqAccident`);
            return res.data;
        },

    });

const handleReject =  (requestAccidentID) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.put(`http://localhost:4000/update_reqStatus/${requestAccidentID}`, {status: "rejected"})
            .then(res => {
                if (res.data) {
                    refetch();
                    Swal.fire({
                        title: "Rejected !",
                        text: "Request has been Rejected",
                        icon: "error"
                    });
                    // console.log("confirm", res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    });
}



const handleAddRequest = (requestAccidentID) => {

    const selectedAccident = AllReqData.find(accident => accident.requestAccidentID === requestAccidentID);
    const formattedDate = moment(selectedAccident?.date).format("YYYY-MM-DD");
    
    const finalAccDetails ={
        location: selectedAccident.location,
        date: formattedDate,
        image: selectedAccident.image,
        time: selectedAccident.time,
        vehicleTypes: selectedAccident.vehicleTypes,
        damageParts: selectedAccident.damageParts,
        deathNumber: selectedAccident.deathNumber,
        repairCost: selectedAccident.repairCost,
        // status: selectedAccident.status,
        description: selectedAccident.description,
        requestAccidentID: selectedAccident.requestAccidentID
    }

    Swal.fire({
        title: "Are you sure?",
        text: "It will be added to the Danger Zone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add It!"
    }).then((result) => {
        if (result.isConfirmed) {

            //add to main accident details
            axios.post("http://localhost:4000/addReq_To_mainAccidentDetails", finalAccDetails)
                .then(res => {
                    if (res.data) {
                        refetch();
                        Swal.fire({
                            title: "Done !",
                            text: "It's available in the Danger Zone.",
                            icon: "success"
                        });
                        console.log("confirm", res.data)
                        // status update
                        axios.put(`http://localhost:4000/update_reqStatus/${requestAccidentID}`, {status: "approved"})
                        .then(res => {
                            if (res.data) {
                                refetch();
                                // Swal.fire({
                                //     title: "Normal user!",
                                //     text: "This User is Now Admin",
                                //     icon: "success"
                                // });
                                // console.log("confirm", res.data)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })


                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    });

}


const handleDeleteReq = (requestAccidentID) => {

    // console.log("delete", userID)

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

            axios.delete(`http://localhost:4000/delete_requestAccidentData?requestAccidentID=${requestAccidentID}`)
                .then(res => {
                    if (res.data) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Data das been deleted.",
                            icon: "success"
                        });
                        
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
             <h1 className="mx-auto text-center text-4xl font-bold italic pb-5 ">All User Request Accident Details </h1>

             <div className="mt-10">
                {
                    AllReqData.length > 0 ? <>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra ">
                                <thead className="bg-gray-200 text-xl text-black">
                                    <tr>
                                        <th></th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        {/* <th>Time</th> */}
                                        <th>Vehicle</th>
                                        <th>Damage Parts</th>
                                        <th>No. of Death</th>
                                        <th>Repair Cost</th>
                                        {/* <th></th> */}
                                        <th>Delete</th>
                                        <th>Edit</th>
                                        <th>status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        AllReqData.map((accident, index) =>
                                            <tr key={index} className="text-lg">
                                                <th>{index+1}</th>
                                                <td>{accident?.location}</td>
                                                <td>{accident?.date && moment(accident?.date).format('DD-MM-YYYY')}</td>
                                                {/* <td>{accident?.time && moment(accident?.time, 'HH:mm:ss').format('hh:mm A')}</td> */}
                                                <td>{accident?.vehicleTypes}</td>
                                                <td>{accident?.damageParts}</td>
                                                <td className="text-red-600 text-center">{accident?.deathNumber}</td>
                                                <td>{accident?.repairCost}</td>
                                                {/* <td> <button  className="btn btn-outline btn-success">show more</button> </td> */}
                                                <td><button disabled={accident?.status === "approved" || accident?.status === "rejected"} onClick={()=>handleReject(accident?.requestAccidentID)} className="btn btn-error px-5 "> Reject </button></td>
                                                <td> <button disabled={accident?.status === "approved" || accident?.status === "rejected" } onClick={()=>handleAddRequest(accident?.requestAccidentID)} className="btn btn-success px-5 text-white ">Add</button> </td>
                                                <td>{accident?.status}</td>
                                                <td><button onClick={()=>handleDeleteReq(accident?.requestAccidentID   )} className="btn btn-error px-5 "> <MdDeleteForever className="size-6" /> </button></td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>

                        {/* disabled={accident?.status === "approved"} */}

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

export default AllReqAccident;