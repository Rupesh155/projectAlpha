import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  let navigate=   useNavigate()
    // let [courses, setCourses] = useState([]);
   let { courseData,activeTab, setActiveTab}=   useContext(Context)
   console.log(activeTab,"jarurrururur");
   
  
   console.log(courseData,"heh");


    let filterSubject=    courseData.filter((data)=>{
        return data.category==activeTab

     })
     console.log(filterSubject,"filteddddddd");

     
   function addCart(id){
    navigate(`/course-detail/${id}`)

   }


//     useEffect(async () => {
//         let res = await axios.get('http://localhost:3000/api/get-course');
//         setCourses(res.data);
//         // console.log(res.data);
//     }, [])
// // 

    return (
        <div className="overflow-x-auto whitespace-nowrap p-4 bg-gray-100 max-w-[1400px] mx-auto">
            <div className="flex space-x-4"  >
                
                {courseData?.map((course, index) => (
                         
                    <div     onClick={()=>addCart(index)}
                        key={index}
                        className="min-w-[280px] w-[280px] bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
                    >
                        <video
                            src={course.videos[0]}
                            alt="Course Thumbnail"
                            className="w-full h-36 object-cover"
                            controls
                        ></video>

                        <div className="p-4">
                            <h3 className="text-sm font-semibold mb-2 text-gray-800">
                                {course.title}
                            </h3>

                            <p className="text-xl text-gray-600 mb-2 truncate ">
                                {course.description}
                            </p>

                            <div className="flex items-center justify-between mb-2">

                                <span className=" text-gray-600">
                                    {course.language}
                                </span>

                                <span className=" text-gray-600">
                                    {course.category}
                                </span>
                            </div>

                            <div className="flex items-center mb-2">
                                <span className="text-lg font-semibold text-gray-800">
                                    ₹{course.price}
                                </span>

                            </div>

                            <span className="text-xs font-semibold text-white bg-yellow-500 px-2 py-1 rounded">
                                {course.level}
                            </span>

                        </div>
                    </div>
                
                ))}
            </div>
        </div>
    );
};

export default Courses;
