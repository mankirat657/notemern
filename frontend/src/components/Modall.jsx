// Modall.js
import React, { useState } from 'react';

const Modall = ({ isOpen, onClose, refreshNotes }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/createNotes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content, tags }),
                credentials: 'include' 
            });
            const result = await response.json();
            if (response.ok) {
                refreshNotes();
                onClose(); 
            } else {
                console.error("Error creating note:", result.error);
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    return (
        <dialog id="my_modal_3" className={`modal ${isOpen ? 'open' : ''}`} open={isOpen}>
            <div className="modal-box relative p-8 overflow-hidden border border-gray-700 rounded-lg shadow-lg max-w-[600px] w-full">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
                    aria-label="Close"
                >
                    ✕
                </button>

                <h3 className="font-bold text-2xl mb-4">Create a Note</h3>

                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-lg font-semibold">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full py-2 px-4 rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
                        placeholder="Enter a title, e.g., Go to gym at 5"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); }}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-lg font-semibold">Content</label>
                    <textarea
                        className="textarea textarea-primary w-full h-32 py-2 px-4 rounded-md resize-none shadow-sm focus:ring focus:ring-primary focus:outline-none"
                        placeholder="Write your content here"
                        value={content}
                        onChange={(e) => { setContent(e.target.value); }}
                    />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-lg font-semibold">Tags</label>
                    <input
                        type="text"
                        className="input input-bordered w-full py-2 px-4 rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
                        placeholder="e.g., #meetings #workout"
                        value={tags}
                        onChange={(e) => { setTags(e.target.value); }}
                    />
                </div>

                <div className="text-right">
                    <button
                        className="bg-primary hover:bg-primary-dark font-medium text-white w-[120px] rounded-lg py-2 px-4 transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary"
                        onClick={handleSubmit} // Call handleSubmit directly
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default Modall;
