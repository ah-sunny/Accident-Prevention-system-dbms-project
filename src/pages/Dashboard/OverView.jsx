import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import axios from "axios"


export const OverView = () => {
 
  const {  user } = useAuth()
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
    <div className="flex justify-center items-center ">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="h-60 rounded-box w-[80% mx-auto] ">
          <img
            src={user?.photoURL ? user?.photoURL : "https://i.ibb.co.com/2hvk2RN/default-user.jpg"}
            alt="user" className="w-[50%] h-[82%] rounded-box " />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">
            {userInfo?.name}
            
          </h2>
          <p> <span className="font-bold">Email :</span> {userInfo?.email}</p>
          <div className="card-actions justify-end">
            {/* <div className="badge badge-outline">Role - {user?.role}</div> */}
            <div className="badge badge-secondary text-xl p-4 text-black font-bold "> {userInfo?.role} </div>
            {/* <div className="badge badge-outline">Products</div> */}
          </div>
        </div>
      </div>

    </div>
  )
}
