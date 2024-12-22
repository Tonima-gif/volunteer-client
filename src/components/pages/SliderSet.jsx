import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";



const SliderSet = () => {
const [sortPost , setSortPost] =useState([])


useEffect(()=>{
  
const handlePostSortData =async ()=>{
  const {data} = await axios.get(`${import.meta.env.VITE_APIHOST}/sortPost`)

const sortedDta = data.sort((a,b)=>a.deadline - b.deadline).splice(0,6)

  setSortPost([...sortedDta])
  }
  handlePostSortData()
},[])



    return (
      <div>
          <div className="text-center mt-10 mb-20"><h1 className="text-4xl text-gray-700 font-bold py-4">Volunteer Needs Now Section</h1>
      <p className="text-sm text-gray-500 font-bold">Here the upcoming deadlines to volunteer needs</p></div>
      
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
{
  sortPost.map(post=><div key={post._id} className="bg-slate-200 shadow-lg p-4 rounded-lg mb-2 lg:flex items-center lg:gap-6 justify-between">
    <div>
      <img className="w-16 h-16 rounded-full border-2 object-cover hover:border-2 hover:border-gray-500" src={post.photo} alt="" />
    <div>
    <h1 className="text-2xl text-gray-600 font-bold">{post.title}</h1>
    <p className="text-base text-gray-500 font-bold ">Deadline :  {format(new Date(post.deadline) ,'P')}</p>
    <p className="text-sm text-gray-400">{post.description.substring(0,60)}...</p>
    </div>
    </div>
    <div>
      <p className={`
       ${post.category==="healthcare"&&"bg-blue-200 rounded-2xl text-blue-600 font-bold text-center text-sm w-fit p-2 my-3"}
       ${post.category==="education"&&"bg-red-300 rounded-2xl text-red-600 font-bold text-center text-sm w-fit p-2 my-3"}
       ${post.category==="social service"&&"bg-green-200 rounded-2xl text-green-400 font-bold text-center text-sm w-fit p-2 my-3"}
       ${post.category==="animal welfare"&&"bg-yellow-200 rounded-2xl text-yellow-600 font-bold text-sm text-center w-fit p-2 my-3"}
       `}>{post.category}</p>
       
      <Link  to={`/sortPost/${post._id}`} className="text-xl text-black font-bold btn mt-6 w-40">View Details</Link>
    </div>
  </div>)
}
</div>
<Link to="/allPosts" className="text-black bg-blue-300 btn mt-8">See All Posts</Link>




      </div>
    );
};

export default SliderSet;