import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../component/loading/Loading";
import moment from 'moment';

const DetailsAccident = () => {
    const { location } = useParams();
    const [allAccident, setAllAccident] = useState([])
    const navigate = useNavigate()
    // console.log(location)

    useEffect(() => {
        axios.get(`http://localhost:4000/locationBasedAccidentDetails?location=${location}`)
            .then(res => {
                setAllAccident(res.data)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [location]);


const handleSingleDetails = (accidentID) => {
    console.log(accidentID)
    navigate(`/dashboard/single-details/${accidentID}`)
}


    return (
        <div>
            <h1 className="mx-auto text-center text-4xl font-bold italic pb-5 ">All Accident Details in <span className="text-5xl not-italic text-red-600">{location}</span></h1>

            <div className="mt-10">
                {
                    allAccident.length > 0 ? <>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra ">
                                <thead className="bg-gray-200 text-2xl text-black">
                                    <tr>
                                        <th></th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        {/* <th>Time</th> */}
                                        <th>Vehicle</th>
                                        {/* <th>Damage Parts</th> */}
                                        <th>No. of Death</th>
                                        {/* <th>Repair Cost</th> */}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allAccident.map((accident, index) =>
                                            <tr key={index} className="text-xl">
                                                <th>{index+1}</th>
                                                <td>{accident?.location}</td>
                                                <td>{accident?.date && moment(accident?.date).format('DD-MM-YYYY')}</td>
                                                {/* <td>{accident?.time && moment(accident?.time, 'HH:mm:ss').format('hh:mm A')}</td> */}
                                                <td>{accident?.vehicleTypes}</td>
                                                {/* <td>{accident?.damageParts}</td> */}
                                                <td className="text-red-600 text-center">{accident?.deathNumber}</td>
                                                {/* <td>{accident?.repairCost}</td> */}
                                                <td> <button onClick={()=>handleSingleDetails(accident.accidentID)} className="btn btn-outline btn-success">show more</button> </td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>



                    </>
                        :
                        <>
                            <Loading></Loading>
                        </>
                }


            </div>

        </div>
    );
};

export default DetailsAccident;