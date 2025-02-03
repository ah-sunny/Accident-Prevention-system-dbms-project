
import { GrOverview } from "react-icons/gr";
import { SiHomeadvisor } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RiChatSettingsLine, RiSkull2Fill } from "react-icons/ri";
import { MdAddLocationAlt, MdAddToPhotos } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiBusBold } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
// import {  useEffect, useState } from "react";
// import axios from "axios";
const Sidebar = () => {

    const { logOut, user } = useAuth()
    const [userInfo, setUserInfo] = useState([])
    // console.log("sidebar: ",userInfo)

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

    return (
        <div className="bg-gray-300 border-r-2 border-r-black h-full min-h-screen p-1 lg:p-5" >
            <h1 className="text-base lg:text-3xl font-medium lg:font-bold mx-auto text-center my-7 " >Accident  </h1>
            <div>
                <ul className="flex flex-col gap-3 pl-1 font-semibold" >
                    <li>
                        <NavLink to="/dashboard/overview" className="flex  justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2  w-full  border-2 rounded-md border-black p-1 "
                        >
                            <GrOverview />
                            Overview</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/place" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" >
                            <RiSkull2Fill />
                            Danger Zones</NavLink>
                    </li>



                    {
                        userInfo.role === 'admin' ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/alluser" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" >
                                        <IoIosPeople />
                                        All-user</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allRequestAccident" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" >
                                        <PiBusBold />
                                        All-Request Accident</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-danger-data" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" >
                                        <RiChatSettingsLine />
                                        Manage Danager-Data</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-danger-data" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" >
                                        <MdAddToPhotos />
                                        Add Danager-Data</NavLink>
                                </li>
                            </>
                            :
                            <>


                                <li>
                                    <NavLink to="/dashboard/add-place" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" >
                                        <MdAddLocationAlt />
                                        Add Request</NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/my-request" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" >
                                        <IoBagHandleOutline />
                                        My Request</NavLink>
                                </li>

                               


                            </>
                    }


                    <li className="mt-5 pt-5 border-t-2 border-black border-dashed " >
                        <NavLink to="/" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 " >
                            <SiHomeadvisor />
                            Home</NavLink>
                    </li>
                    <button className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1" onClick={() => logOut()}><Link to='/'>Logout</Link></button>
                </ul>


            </div>

        </div>
    );
};

export default Sidebar;