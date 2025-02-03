import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";


const ManageDangerData = () => {

    const { data: allDangerData = [],refetch } = useQuery({
        queryKey: ['allDangerData',], 
        queryFn: async () => {
            const res = await axios.get(`http://localhost:4000/get_data`);
            return res.data;
        },

    });
console.log(allDangerData)



const handleDeletedata = (accidentID,requestAccidentID) => {

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

            axios.delete(`http://localhost:4000/delete_dangerData?accidentID=${accidentID}`)
                .then(res => {
                    if (res.data) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Data das been deleted.",
                            icon: "success"
                        });

// update status of request is pending
                        axios.put(`http://localhost:4000/update_reqStatus/${requestAccidentID}`, {status: "pending"})
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
                        console.log("confirm", res.data)
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
                    <h1 className="mx-auto text-center text-4xl font-bold italic pb-5 ">All Request Accident Details </h1>
       
                    <div className="mt-10">
                       {
                           allDangerData.length > 0 ? <>
       
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
                                               {/* <th>Edit</th> */}
                                               {/* <th>status</th> */}
                                           </tr>
                                       </thead>
                                       <tbody>
                                           {
                                               allDangerData.map((accident, index) =>
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
                                                       <td><button onClick={()=>handleDeletedata(accident?.accidentID,accident?.requestAccidentID   )} className="btn btn-error px-5 "> <MdDeleteForever className="size-6" /> </button></td>
                                                       {/* <td> <button disabled={accident?.status === "approved"}  className="btn btn-success px-5 text-white ">Add</button> </td> */}
                                                       {/* <td>{accident?.status}</td> */}
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

export default ManageDangerData;