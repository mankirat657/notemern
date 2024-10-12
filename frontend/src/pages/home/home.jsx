import React, { useState, useEffect } from 'react';
import NoteCard from '../../components/cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import Modall from '../../components/Modall';
import { useUser } from '../../UserContext';
import UpdateComponent from '../../components/UpdateComponent';
import DeleteComponent from '../../components/DeleteComponent';
import Search from '../../components/Search';
import ProfilePicSetter from '../../components/ProfilePicSetter';

const Home = () => {
  const { clicked, del, searchTitle } = useUser();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const { user , pfopen} = useUser();

  useEffect(() => {
    if (user && user.name) {
      localStorage.setItem('username', user.name);
    }
  }, [user]);

  const username = localStorage.getItem("username");

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/notes', {
        method: "GET",
        credentials: 'include'
      });
      const result = await response.json();
      if (response.ok) {
        setNotes(result);
      } else {
        console.error("Error fetching notes:", result.error);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = searchTitle
    ? notes.filter(note =>
        note.title.toLowerCase().includes(searchTitle.toLowerCase())
      )
    : notes;

  return (
    <>
      <div className='w-full pl-9 pr-9'>
        <h1 className='font-semibold text-3xl pt-8 mainheading'>Welcome <span className='text-blue-200'>{username}</span></h1>
        <p>Start creating some notes</p>
        <div className="mt-4 pr-9">
          <Search placevalue="Search your notes here" notes={notes} />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 mygrid">
          {[...filteredNotes].reverse().map(note => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={new Date(note.createdAt).toLocaleDateString()}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
            />
          ))}
        </div>
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => setIsModalOpen(true)}
      >
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modall
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshNotes={fetchNotes} 
      />
      {clicked && <UpdateComponent />}
      {del && <DeleteComponent />}
      {pfopen && <ProfilePicSetter />}
    </>
  );
};

export default Home;
