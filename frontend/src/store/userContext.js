import {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const UserContext=createContext(null)
function User({children}){
const [user,setUser] = useState()
const [profile, setProfile] = useState([])
useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data)
                })
                .catch((err) => console.log(err));
        }
    }
)
    
    return(
    <UserContext.Provider value={{profile,setUser}}>
        
        {children}
        
    </UserContext.Provider>
    )
}

export default User;