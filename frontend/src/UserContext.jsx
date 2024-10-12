
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', email: '' });
    const[clicked,setClicked] = useState(false)
    const[del,setDelete] = useState(false)
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [tags,setTags] = useState('')
    const[searchTitle,setSearchTitle] = useState('')
    const[pfopen,setPfOpen] = useState(false);
    const[getpf,setGetPf] = useState('')
    const login = (userData) => {
        setUser(userData);
    };
    const pfpsetter = (infof) =>{
        setGetPf(infof)
    }
    const clickedd = (onoff) =>{
        setClicked(onoff)
    }
    const profileopenn = (pfonoff) =>{
        setPfOpen(pfonoff)
    }
    const settingTitle = (thetitle) =>{
        setSearchTitle(thetitle)
    }
    const deletted = (offon) =>{
        setDelete(offon)
    }
    const titling = (titlonoff) =>{
        setTitle(titlonoff)
    }
    const contenting = (contenting) =>{
        setContent(contenting)
    }
    const tagging = (taggsz) =>{
        setTags(taggsz)
    }
    const logout = () => {
        setUser({ name: '', email: '' });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, clickedd,clicked,titling,contenting,tagging,title,content ,tags,deletted,del,settingTitle,searchTitle,profileopenn,pfopen,pfpsetter,getpf}}>
            {children}
        </UserContext.Provider>
    );
};
