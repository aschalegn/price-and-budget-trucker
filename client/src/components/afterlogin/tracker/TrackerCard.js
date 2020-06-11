import React from 'react';

export default function TrackerCard(props) {
    return (
        <div className="trackerCard">
            <i className="far fa-trash-alt" onClick={() => { props.deleteTrack(props.singleTrack._id) }}></i>
            <div className="details">
                <h4>{props.singleTrack.title}</h4>
                <img src={props.singleTrack.image} />
                <p className="prices">
                    <span>Last Price: {props.singleTrack.price} </span>
                    <span> Starting Price: {props.singleTrack.currentPrice}$</span>
                    <span> Desired Price: {props.singleTrack.desiredPrice}$</span>
                </p>
                <p> <a className="link" href={props.singleTrack.url}>Buy</a> </p>
            </div>
        </div>
    );
}
