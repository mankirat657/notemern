import React, { useState } from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'
import { useUser } from '../../UserContext'
const NoteCard = ({title,date,content,tags, isPinned,onPinNote}) => {
    const[openModal, setOpenModal] = useState()
    const {clickedd,clicked,titling,contenting,tagging,deletted,del} = useUser();
    const onEdit = () =>{
            clickedd(!clicked)
            titling(title)
            contenting(content)
            tagging(tags)
        }
        const onDelete = () =>{
            deletted(!del)
            titling(title)
            contenting(content)
            tagging(tags)
        }
  return (
    <div className='border border-gray-600 rounded mcard w-[30vw] p-4 bg-[#262e38] hover:shadow-xl transition-all ease-in-out'>
        
        <div className="flex items-center justify-between">
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className="text-xs text-slate-500">{date}</span>
            </div>
           
        </div>
        <p className='text-xs text-slate-500'>{content?.slice(0,60)}</p>
        <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-slate-500">{tags}</div>
            <div className="flex items-center gap-2">
                <MdCreate
                    className='icon-btn hover:text-green-600'
                    onClick={onEdit}
                />
                <MdDelete
                    className='icon-btn hover:text-red-600'
                    onClick={onDelete}
                />    
            </div>
        </div>

    </div>
  )
}

export default NoteCard
