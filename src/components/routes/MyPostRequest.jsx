import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../pages/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import { FcRemoveImage } from "react-icons/fc";
import Swal from "sweetalert2";


const MyPostRequest = () => {
const [myRequest, setMyRequest] = useState([])
const {user}=useContext(AuthContext)

useEffect(()=>{
  
 handlePostSortData()
 },[user.email])
        
const handlePostSortData =async ()=>{
const {data} = await axios.get(`${import.meta.env.VITE_APIHOST}/addBid/${user?.email}`)

setMyRequest(data)
 }
        

        
const handleDelete = async(id)=>{
  try{ 

   Swal.fire({
       title: "Are you sure?",
       text: "You want to cancel this request!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, cancel it!"
     }).then(async(result) => {
       if (result.isConfirmed) {
  await axios.delete(`${import.meta.env.VITE_APIHOST}/bidDelete/${id}`)
   handlePostSortData()
         Swal.fire({
           title: "Canceled!",
           text: "Your request has been canceled.",
           icon: "success"
         });
       }
     });

}
  catch(err){
   console.log(err)
  }
}


    return (
        <div>
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className=" border-2">
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th className="text-base">Title</th>
        <th className="text-base">Category ,Deadline</th>
        <th className="text-base">Organizer</th>
        <th className="text-base">Action</th>
      </tr>
    </thead>
    <tbody>
     {myRequest.map(post=> <tr  key={post._id} className="border border-green-300 rounded-xl">
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{post.title}</div>
              <div className="text-sm opacity-50">{post.location}</div>
            </div>
          </div>
        </td>
        <td>
        <p className={`
       ${post.category==="healthcare"&&"bg-blue-200/60 rounded-2xl text-blue-600 font-bold text-center text-sm w-fit px-1"}
       ${post.category==="education"&&"bg-red-300/60 rounded-2xl text-red-600 font-bold text-center text-sm w-fit px-1"}
       ${post.category==="social service"&&"bg-green-200/60 rounded-2xl text-green-400 font-bold text-center text-sm w-fit px-1"}
       ${post.category==="animal welfare"&&"bg-yellow-200/60 rounded-2xl text-yellow-600 font-bold text-sm text-center w-fit px-1"}
       `}>
              {post.category}
            </p>
          <br />
          <span className="badge badge-ghost badge-sm">{format(new Date(post.deadline) ,'P')}</span>
        </td>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{post.userName}</div>
              <div className="text-sm opacity-50">{post.userEmail}</div>
            </div>
          </div>
        </td>
        <th>
          <button onClick={()=>handleDelete(post._id)} className="btn btn-ghost btn-xs"><FcRemoveImage className="text-2xl text-red-400" /></button>
        </th>
      </tr>)}
    </tbody>
   
  </table>
</div>
{myRequest.length==0 &&<p className="text-2xl text-red-500 font-bold mt-9 mb-80">You don't have any post requests.....</p>}
        </div>
    );
};

export default MyPostRequest;