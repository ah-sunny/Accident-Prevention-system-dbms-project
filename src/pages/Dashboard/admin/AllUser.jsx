import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const AllUser = () => {


    const { data: alluser = [], refetch } = useQuery({
        queryKey: ['alluser',], // Adding user.email to query key to trigger re-fetch on email change
        queryFn: async () => {
            const res = await axios.get(`http://localhost:4000/get_alluser`);
            return res.data;
        },

    });

    // console.log("alluser", alluser)

    const handleDelete = (userID) => {

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

                axios.delete(`http://localhost:4000/delete_user?userID=${userID}`)
                    .then(res => {
                        if (res.data) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                            console.log("confirm", res.data)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }

    const handleMakeAdmin = (userID) => {
        // console.log("update", userID)

        const data = {
            role: "admin",
            status: "approved"
        }


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.put(`http://localhost:4000/update_user/${userID}`, data)
                    .then(res => {
                        if (res.data) {
                            refetch();
                            Swal.fire({
                                title: "Admin!",
                                text: "This User is Now Admin",
                                icon: "success"
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


    const handleRemoveAdmin = (userID) => {
        // console.log("update", userID)

        const data = {
            role: "normal-user",
            status: "approved"
        }


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Normal User!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.put(`http://localhost:4000/update_user/${userID}`, data)
                    .then(res => {
                        if (res.data) {
                            refetch();
                            Swal.fire({
                                title: "Normal user!",
                                text: "This User is Now Admin",
                                icon: "success"
                            });
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

            <div>
                <h1 className="mx-auto text-center text-4xl font-bold italic pb-5 ">All User In My System</h1>

                <div className="mt-10">
                    {
                        alluser.length > 0 ? <>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra ">
                                    <thead className="bg-gray-200 text-2xl text-black">
                                        <tr>
                                            <th></th>
                                            <th>Name </th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>

                                            <th></th>
                                            <th>promotion</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            alluser.map((info, index) =>
                                                <tr key={index} className="text-xl">
                                                    <th>{index + 1}</th>
                                                    <td>{info?.name}</td>
                                                    <td>{info?.email}</td>
                                                    <td>{info?.role}</td>
                                                    <td>{info?.status}</td>
                                                    <td><button onClick={() => handleDelete(info?.userID)} disabled={info?.role === "admin"} className="btn btn-error px-5 "> <MdDeleteForever className="size-6" /> </button></td>
                                                    {/* <td> <Link to={`/dashboard/edit-request/${info?.userID}`}> <button className="btn btn-success btn-outline px-5 "> <FaRegEdit className="size-6" /> </button> </Link></td> */}
                                                    <td > <button onClick={() => handleMakeAdmin(info?.userID)}
                                                        disabled={info?.role === "admin"} className=" btn btn-success" >make admin</button> </td>
                                                    <td > <button onClick={() => handleRemoveAdmin(info?.userID)}
                                                        disabled={info?.role === "normal-user"} className=" btn btn-error btn-outline" >remove admin</button> </td>

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
        </div>
    );
};

export default AllUser;