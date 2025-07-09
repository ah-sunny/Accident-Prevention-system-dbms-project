import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-12 min-h-screen h-full " >
                <div className="col-span-2 h-full">

                    <Sidebar></Sidebar>
                </div>
                <div className="col-span-10 h-full" >
                    <h1 className="text-base lg:text-3xl font-medium lg:font-bold mx-auto text-center mb-3 h-20 pt-6 bg-gradient-to-r from-red-500 to-blue-500 text-white border-b-2 border-black" >Road Accident Survey and prevention system</h1>
                    <div className="p-1 lg:p-0   h-full" >

                        <Outlet></Outlet>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;