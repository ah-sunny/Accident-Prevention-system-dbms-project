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
                    <h1 className="text-base lg:text-3xl font-medium lg:font-bold mx-auto text-center mb-3 h-20 pt-6 bg-gray-300 border-b-2 border-black" >Accident Prevention   </h1>
                    <div className="p-2 lg:p-7   h-full" >

                        <Outlet></Outlet>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;