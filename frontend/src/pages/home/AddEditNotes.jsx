import React from 'react'

const AddEditNotes = () => {
    return (
        <div className='p-10'>
            <div className="flex flex-col gap-2">
                <h1 className='font-semibold'>Title</h1>
                <label className="input input-bordered w-[40vw] flex items-center gap-2">

                    <input
                        type="text"
                        className="grow"
                        placeholder="Go to gym at 5"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <div className="flex flex-col gap-2 pt-4">
                <h1 className='font-semibold'>Content</h1>
                <textarea className="textarea textarea-primary w-[40vw] resize-none" placeholder="Write your content"></textarea>
            </div>
            <div className="mt-3">
                <div className="input-label font-semibold">Tags</div>
            </div>
            <button className="bg-primary font-medium w-[12vw] text-white rounded-xl mt-5 p-3" onClick={()=>{}}>
                Add
            </button>
        </div>
    )
}

export default AddEditNotes
