
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
        axios.get(`${import.meta.env.VITE_API_URL}/get_user?email=${user.email}`)
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
                        <NavLink to="/dashboard/overview"
                            className={({ isActive }) =>
                                `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                }`
                            }
                        >
                            <GrOverview />
                            Overview</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/place"
                            className={({ isActive }) =>
                                `flex justify-center items-center text-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                }`
                            } >
                            <RiSkull2Fill />
                            Danger Zones</NavLink>
                    </li>



                    {
                        userInfo.role === 'admin' ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/alluser"
                                        className={({ isActive }) =>
                                            `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                            }`
                                        } >
                                        <IoIosPeople />
                                        All-user</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allRequestAccident"
                                        className={({ isActive }) =>
                                            `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                            }`
                                        } >
                                        <PiBusBold />
                                        All Req Accident </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-danger-data"
                                        className={({ isActive }) =>
                                            `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                            }`
                                        } >
                                        <RiChatSettingsLine />
                                        Manage Danager-Data</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-danger-data"
                                        className={({ isActive }) =>
                                            `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                            }`
                                        } >
                                        <MdAddToPhotos />
                                        Add Danager-Data</NavLink>
                                </li>
                            </>
                            :
                            <>

                                {/* <li>
                                    <NavLink
                                        to="/dashboard/add-danger-data"
                                        className={({ isActive }) =>
                                            `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-red-500 text-white' : 'text-black'
                                            }`
                                        }
                                    >
                                        <MdAddToPhotos />
                                        Add Danger-Data
                                    </NavLink>
                                </li> */}


                                <li>
                                    <NavLink to="/dashboard/add-place"
                                        className={({ isActive }) =>
                                            `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                            }`
                                        } >
                                        <MdAddLocationAlt />
                                        Add New Accident Place </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/my-request"
                                        className={({ isActive }) =>
                                            `flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'text-black'
                                            }`
                                        } >
                                        <IoBagHandleOutline />
                                        My Accident</NavLink>
                                </li>




                            </>
                    }


                    <li className="mt-5 pt-5 border-t-2 border-black border-dashed " >
                        <NavLink to="/" className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 bg-gradient-to-t from-sky-400 to-blue-700 text-white " >
                            <SiHomeadvisor />
                            Home</NavLink>
                    </li>
                    <button className="flex justify-center items-center flex-col lg:flex-row text-xs lg:text-lg gap-0 lg:gap-2 border-2 rounded-md border-black p-1 bg-gradient-to-b from-sky-400 to-blue-700 text-white " onClick={() => logOut()}><Link to='/'>Logout</Link></button>
                </ul>


            </div>

        </div>
    );
};

export default Sidebar;