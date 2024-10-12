import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { useUser } from '../UserContext';
import { toast, Toaster } from 'react-hot-toast';
const UpdateComponent = () => {
    const {clickedd,clicked,title,content,tags} = useUser()
    const[newTitle,setNewTitle] = useState('')
    const[newContent,setNewContent] = useState('')
    const[newTags,setNewTags] = useState('')
    function handleClose (){
        clickedd(!clicked)
    }
    const handlesubmit = async(e) =>{
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/updateNotes",{
                method  :"POST",
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify({newTitle,newContent,newTags, prevTitle : title}),
                credentials : "include"
            })
            const result = await response.json(); 
            console.log("API Response:", result);
            if (response.ok) {
                toast.success("Note updated Successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error("Something went wrong"); 
            } 
        } catch (error) {
            toast.error('Server error, please try again later.'); 
        }
    }
    return (
        <div className='w-[35vw] updatemodel border border-[#3d4a59] min-h-[60vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#262e38] p-3'>
            <div className="absolute right-4 top-4" onClick={handleClose}><IoIosClose size={30} /></div>
            <h1 className='font-semibold text-2xl'>Update Your Note</h1>
            <form className='pt-4 p-4'>
                <div className="">
                <label className='font-semibold'>Title :</label>
                <input
                        type="text"
                        className="input mt-3 bg-[#35404e] input-bordered w-full py-2 px-4 rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
                        placeholder={title}
                      onChange={(e)=>{setNewTitle(e.target.value)}}
                    />
                </div>
                <div className="mt-2">
                <label className='font-semibold'>Content :</label>
                <textarea
                        className="textarea bg-[#35404e] textarea-primary w-full h-32 py-2 px-4 rounded-md resize-none shadow-sm focus:ring focus:ring-primary focus:outline-none"
                        placeholder={content}
                        onChange={(e)=>{setNewContent(e.target.value)}}
                    />
                </div>
                <div className="mt-2">
                <label className='font-semibold'>Tags :</label>
                <input
                        type="text"
                        className="input mt-3 bg-[#35404e] input-bordered w-full py-2 px-4 rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
                        placeholder={tags}
                        onChange={(e)=>{setNewTags(e.target.value)}}
                    />
                </div>
                <div className="mt-4">
                <button className="btn btn-neutral" onClick={handlesubmit} >Update Your Note</button>
                </div>
            </form>
            <Toaster />
        </div>
    )
}

export default UpdateComponent
