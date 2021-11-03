import React from 'react'
import './App.css';
import pic from './Robotics-amico 1.png';

const Homepage = () => {
    return (
        <div className='homepage'>
            <h1 className="hea">Robotics</h1>
            <img alt="" className="immg" src={pic}></img>
            <p className="content">
                <h1 className="h1">TOPICS COVERED</h1>
                <p className="para"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, provident.
                    <h1 className="h2">TOOLS</h1>
                    <p className="pp">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, provident. </p>
                </p>
            </p>
            <button className="btnn">READ MORE</button>
            <a href="/" className="left1"> ←</a>
            <a href="/" className="right1">→</a>
        </div>
    )
}

export default Homepage
