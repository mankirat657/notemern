import React from 'react'
import { MdAutoDelete } from "react-icons/md";
import { useUser } from '../UserContext';
import { toast, Toaster } from 'react-hot-toast';
const DeleteComponent = () => {
    const {del,deletted} = useUser()
    function handlekeepit(){
        deletted(!del)
    }
    const {title} = useUser();
    const handledeleteClick = async(e) =>{
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/deleteNotes',{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({prevTitle : title}),
                credentials : "include"
            })
            const result = await response.json(); 
            console.log("API Response:", result);
            if (response.ok) {
                toast.success("Note deleted Successfully");
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
        <div className='w-[35vw] deletecomponent border border-[#3d4a59] min-h-[50vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[rgb(38,46,56)] p-3'>
            <div className="flex items-center flex-col">
                <MdAutoDelete size={180} className='myicon' />
                <div className="">
                    <h1 className='font-semibold text-lg text-center'>Are you sure u want to delete your note ?</h1>
                </div>
                <div className="button flex items-center gap-2 pt-3">
                    <button className="btn bg-blue-600 text-white" onClick={handlekeepit}>No Keep it</button>
                    <button className="btn  bg-red-600 text-white" onClick={handledeleteClick}>Yes Delete it</button>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default DeleteComponent
