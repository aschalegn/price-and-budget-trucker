import React, { useReducer, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import {TrackReducer} from "../actions/TrackAction";
import { userContext } from './userContext';
export const TrackContext = createContext()
const TrackContextProvider = props => {
    const [track, trackDispatch] = useReducer(TrackReducer,[])
    const { userStatus} = useContext(userContext);
    useEffect(() => {
        if (userStatus.user._id) {
            axios.get(`/tracker/${userStatus.user._id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    trackDispatch({ type: "GET_TRACKER", payload: res.data.trackers })
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, [userStatus]);

    return (
        <TrackContext.Provider value={{ track, trackDispatch }}>
            {props.children}
        </TrackContext.Provider>
    )
}

export default TrackContextProvider