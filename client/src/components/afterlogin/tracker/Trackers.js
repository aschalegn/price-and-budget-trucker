import React, { useState, useContext } from 'react'
import AddTracker from "./AddTracker/index";
import { TrackContext } from '../../../contexts/trackCotext';
import "./Tracker.css";
import Axios from 'axios';
import { userContext } from '../../../contexts/userContext';
import TrackerCard from './TrackerCard';

const Trackers = () => {
    const [addNew, setAddNew] = useState(false)
    const { track, trackDispatch } = useContext(TrackContext);
    const { userStatus } = useContext(userContext)

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
            <section className="upperSection">
                <h2>Products you are Tracking After</h2>
                <div className="addTrack"><i className="addTrack_sign" onClick={() => setAddNew(!addNew)}>&#43;</i></div>
            </section>
                {addNew ? <AddTracker setAddNew={setAddNew}/> : ''}
            <section className="trackersContainer">
                {track.map((singleTrack, i) =>
                    <TrackerCard key={i} deleteTrack={deleteTrack} singleTrack={singleTrack} />
                )}
            </section>
        </section>
    );
}

export default Trackers