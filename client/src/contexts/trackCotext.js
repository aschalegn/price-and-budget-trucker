import React, { useReducer, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import {TrackReducer} from "../actions/TrackAction";
import { isLogedInContext } from './isLogedInContext';
export const TrackContext = createContext()
const TrackContextProvider = props => {
    const [track, trackDispatch] = useReducer(TrackReducer,[])
    const { userStatus} = useContext(isLogedInContext);
    useEffect(() => {
        if (userStatus.user._id) {
            axios.get(`/tracker/${userStatus.user._id}`)
            .then(res => {
                if (res.status === 200) {
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