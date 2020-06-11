import React, { useState, useContext } from 'react'
import AddTracker from "./AddTracker";
import { TrackContext } from '../../../contexts/trackCotext';
import "./Tracker.css";
import Axios from 'axios';
import { isLogedInContext } from '../../../contexts/isLogedInContext';
import TrackerCard from './TrackerCard';

const Trackers = props => {
    const [addnew, setAddnew] = useState(false)
    const { track, trackDispatch } = useContext(TrackContext);
    const { userStatus } = useContext(isLogedInContext)

    const deleteTrack = id => {
        if (window.confirm("you sure you want to delete the tracker")) {
            console.log(userStatus.user._id);

            Axios.delete(`/tracker/${id}/${userStatus.user._id}`)
                .then(res => {
                    if (res.status === 200) {
                        trackDispatch({ type: "DELETE_TRACKER", payload: res.data });
                    }
                    return
                }).catch(err => {
                    console.log(err);
                })
        }
        else {
            console.log("canceled");
        }
    }

    return (
        <section className="Trackers">
            <h2>Products you are Tracking After</h2>
            <section className="trackersContainer">
                {track.map((singleTrack, i) =>
                    <TrackerCard key={i} deleteTrack={deleteTrack} singleTrack={singleTrack} />
                )}
            </section>
            <section>
                <div className="addTrack"><i className="addTrack_sign" onClick={() => setAddnew(!addnew)}>&#43;</i></div>
                {addnew ? <AddTracker /> : ''}
            </section>
        </section>
    );
}

export default Trackers