import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from 'moment';

const SingleDetails = () => {
    const { accidentID } = useParams();
    console.log(accidentID)
    const accidentIDInt = parseInt(accidentID);
    const [singleAccident, setSingleAccident] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:4000/accidentDetailsByAccidentID?accidentID=${accidentIDInt}`)
            .then(res => {
                setSingleAccident(res.data[0])
                console.log(res.data[0])
            })
            .catch(err => {
                console.log(err)
            })

    }, [accidentIDInt]);

    return (
        <div>
            <div className="flex flex-col items-center card shadow-md p-12">
                <div className="flex w-full gap-5">
                    <div className="w-2/5">
                        <img src={singleAccident?.image} alt="Accident" className="w-full rounded-md" />
                    </div>
                    <div className="w-3/5 border-l-2 border-gray-600 border-dashed space-y-5 font-semibold p-7">
                        <p className="text-4xl font-bold italic mx-auto text-center">Location : {singleAccident?.location}</p>
                        <p>Vehicle Type: {singleAccident?.vehicleTypes} </p>
                        <div className="flex gap-7">
                            <p>Date :  {singleAccident?.date && moment(singleAccident?.date).format('DD-MM-YYYY')}</p> <p> Time: {singleAccident?.time && moment(singleAccident?.time, 'HH:mm:ss').format('hh:mm A')} </p>
                        </div>
                        
                        <p className="text-red-500">No. of Death : {singleAccident?.deathNumber}</p>
                        <p>Repair Cost :  {singleAccident?.repairCost} tk</p>
                        <div>
                        <p>discription : </p>
                        <p className="font-normal">{singleAccident?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleDetails;