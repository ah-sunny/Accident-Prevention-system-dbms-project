
import { Outlet } from 'react-router-dom';
import  Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const MainLayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='min-h-screen' >
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default MainLayout;