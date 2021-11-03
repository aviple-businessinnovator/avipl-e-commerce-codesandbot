import React from 'react'
import "./programSection.css"
import robotic from "../../asserts/robotics.png";
import coding from "../../asserts/coding.png";
import iot from "../../asserts/iot.png";
import rubic from "../../asserts/rubic-cubes.png";
import { useHistory } from 'react-router';

export default function ProgramSection() {
   function LowerCard(name, para, image, last) {
      let history = useHistory();
      return (<div className="lower-card">
         <div className="image lc-img" style={{ backgroundImage: `url('${image}')` }}></div>
         <div className="content">
            <div className="lc-text">
               <h3>{name}</h3>
               <p>{para}</p>
               <div className="learnbtn" onClick={() => { history.push(`${localStorage.getItem('Token') ? '/home' : '/sign-in'}`) }}>Learn More</div>
            </div>
            {last ? null : <div className="image line-lower-card"></div>}
         </div>
      </div>)
   }
   return (
      <div className="program-sec">
         <div className="ps-upper">
            <div className="ps-upper-text">
               <h2>Programs</h2>
               <p>Our programs are designed to develop children and bring out their talents for amazing future.</p>
            </div>
            <div className="image ps-upper-image">
            </div>
         </div>
         <div className="ps-lower">
            {LowerCard('Robotics', 'Our programs are designed to develop children and bring out their talents for amazing future.', robotic, 0)}
            {LowerCard('Coding', 'Our programs are designed to develop children and bring out their talents for amazing future.', coding, 0)}
            {LowerCard('IOT', 'Our programs are designed to develop children and bring out their talents for amazing future.', iot, 0)}
            {LowerCard('Rubics Cube', 'Our programs are designed to develop children and bring out their talents for amazing future.', rubic, 1)}
         </div>
      </div>
   )
}
