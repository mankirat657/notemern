import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import { IoIosClose } from "react-icons/io";

const ProfilePicSetter = () => {
  const { user, pfopen, profileopenn ,pfpsetter,getpf} = useUser();
  const [file, setFile] = useState(null); 
  const [message, setMessage] = useState(""); 
  const [profilePicUrl, setProfilePicUrl] = useState(""); 

  function handleclose() {
    profileopenn(!pfopen);
  }

  useEffect(() => {
    if (user && user.name) {
      localStorage.setItem('username', user.name);
    }

    fetchProfilePic();

  }, [user]);

  const username = localStorage.getItem("username");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        credentials: 'include', 
        body: formData,
      });

      if (response.ok) {
        setMessage("Profile picture uploaded successfully!");
        fetchProfilePic(); 
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error uploading the profile picture:', error);
      setMessage('Error uploading the profile picture');
    }
  };

  const fetchProfilePic = async () => {
    try {
      const response = await fetch('http://localhost:3000/profilePic', {
        method: 'GET',
        credentials: 'include', 
      });

      if (response.ok) {
        const blob = await response.blob(); 
        const url = URL.createObjectURL(blob); 
        setProfilePicUrl(url); 
        pfpsetter(url)
      } else {
        setMessage("Error fetching profile picture");
      }
    } catch (error) {
      console.error("Error fetching the profile picture:", error);
      setMessage("Error fetching the profile picture");
    }
  };

  return (
    <div className='w-[35vw] pfpsetter border border-[#3d4a59] min-h-[45vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[rgb(38,46,56)] p-3 '>
      <div className="fixed top-2 right-2" onClick={handleclose}>
        <IoIosClose size={40} />
      </div>
      <div className="flex justify-center">
        <h1 className='font-semibold'>Set The Profile Picture</h1>
      </div>
      <div className="flex gap-2 flex-col items-center p-4">

        <div className="w-40 h-40 rounded-full bg-[#313b47] overflow-hidden">
          {profilePicUrl ? (
            <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="flex">
          <input type="file" className='ml-20' onChange={handleFileChange} />
        </div>
      </div>
      <div className="flex justify-center capitalize font-semibold text-2xl">{username}</div>

      <div className="flex justify-center mt-4">
        <button 
          className='bg-blue-500 text-white p-2 rounded-lg' 
          onClick={handleUpload}>
          Upload
        </button>
      </div>

      {message && <div className="flex justify-center mt-4 text-red-500">{message}</div>}
    </div>
  );
}

export default ProfilePicSetter;
