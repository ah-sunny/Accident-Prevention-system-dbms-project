
import { FaOpencart } from "react-icons/fa";
import {  NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { RiSkull2Fill } from "react-icons/ri";



 const Navbar = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    // const token = localStorage.getItem("access-token")
    // const hideButton = userD?.role === 'seller' && userD?.role === 'admin'

    const handleSignOut = () => {
        logOut()
            .then(() => {

                Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'You log out.',
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate("/")
            })
            .catch(error => {
                console.error(error)
            })
        console.log("clicked")
    }


    // useEffect(() => {
    //     const fetch = async () => {
    //         axios.get(`https://mini-mart-server.vercel.app/cart?email=${user?.email}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //             .then(res => {
    //                 console.log(" receive", res.data)
    //                 setCartNumber(res.data.cartCount)

    //             })
    //     }
    //     fetch()
    // }, [user, token])

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NavLink to="/" >Home</NavLink></li>
                        <li><NavLink to="/dashboard/overview" >Dashboard</NavLink></li>
                        <li><NavLink to="/dashboard/place" className='flex justify-center items-center' > <RiSkull2Fill className="text-lg" /> Danger Zone</NavLink></li>
                        <li><NavLink to="/about-us" >About Us</NavLink></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-sm lg:text-xl"><FaOpencart /> Accident Preventor</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold ">
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="/dashboard/overview" >Dashboard</NavLink></li>
                    <li><NavLink to="/dashboard/place" className='flex justify-center items-center' > <RiSkull2Fill className="text-lg" /> Danger Zone</NavLink></li>
                    <li><NavLink to="/about-us" >About Us</NavLink></li>


                </ul>
            </div>
            <div className="navbar-end gap-1 ">
                {
                    user ?

                        <> 
                        {/* <button  >
                            <Link to='/dashboard/cart' className="indicator mr-4">
                                <span className="indicator-item badge badge-sm px-1 badge-secondary">45+</span>
                                <LiaCartPlusSolid className="size-6 mr-1.5" />
                            </Link>
                        </button> */}

                            

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className=" m-1">
                                    <div className="avatar">
                                        <div className=" w-9 rounded-full ">
                                            <img src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co.com/myc0rNs/rabbit.png'} />
                                        </div>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><NavLink to='/dashboard/overview' >Dashboard</NavLink></li>
                                    <li onClick={handleSignOut} className=" mt-1 btn btn-outline btn-sm " >Logout</li>

                                </ul>
                            </div>

                        </>

                        :

                        <div>
                            <NavLink to='/Login' > <button className="btn btn-xs lg:btn-sm btn-primary btn-outline " >Login</button> </NavLink>
                            <NavLink to="/register"> <button className="btn btn-xs lg:btn-sm btn-primary " >Register</button> </NavLink>
                        </div>
                }


            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default Navbar;