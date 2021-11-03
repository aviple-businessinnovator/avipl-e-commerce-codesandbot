import React from 'react'
import { NavLink } from 'react-router-dom'
import "./carrerSection.css"
export default function CareerSection() {
   return (
      <div className="c-sec-body">
         <div className="c-content">
            <div className="c-text">
               <h2>How these<span style={{ color: '#FFB901' }}> Courses</span> will help you in future?</h2>
               <p>In Todays world we have upcoming technologies, where are world is growing rapidly with tech industries. We have self driven car and smart home... </p>
            </div>
            <NavLink to="/sign-in"><div className="signup" >Sign Up</div></NavLink>
         </div>
         <video className="image c-video">
            {/* <source src="movie.mp4" type="video/mp4"> */}
            {/* <source src="movie.ogg" type="video/ogg"> */}
         </video>
      </div >
   )
}
