import React from 'react'
import "./chooseUsSection.css"
import coding from "../../asserts/coding-contest.png"
import competitive from "../../asserts/competitive.png"
import industry from "../../asserts/industry-certificate.png"
import expInst from "../../asserts/experienced-instructor.png"
import doubt from "../../asserts/doubt-session.png"
import robotic from "../../asserts/robotic.png"
export default function ChooseSection() {
   return (
      <div className="image cs-body">
         <div className="cs-upper">
            <h1><span style={{ color: '#FFC42A' }}>Why Choose us </span>for your kids?</h1>
            <p>In Todays world we have upcoming technologies, where are world is growing rapidly with tech industries. We have self driven car and smart home... </p>
         </div>
         <div className="cs-lower">
            <div className="cs-lower-text">
               <div className="cs-lower-card first-program-card">
                  <div className="image cs-lower-card-image" style={{ backgroundImage: `url('${competitive}')` }}></div>
                  <div className="image cs-lower-card-text">
                     <h2>Competitive Challenges</h2>
                     <p>We prepare students for competitive test like for the Google Coding Contest.</p>
                  </div>
               </div>
               <div className="cs-lower-card">
                  <div className="image cs-lower-card-image" style={{ backgroundImage: `url('${coding}')` }}></div>
                  <div className="image cs-lower-card-text">
                     <h2>Coding Contest</h2>
                     <p>We prepare students for competitive test like for the Google Coding Contest.</p>
                  </div>
               </div>
               <div className="cs-lower-card">
                  <div className="image cs-lower-card-image" style={{ backgroundImage: `url('${industry}')` }}></div>
                  <div className="image cs-lower-card-text">
                     <h2>Industry Certification</h2>
                     <p>We prepare students for competitive test like for the Google Coding Contest.</p>
                  </div>
               </div>
               <div className="cs-lower-card">
                  <div className="image cs-lower-card-image" style={{ backgroundImage: `url('${expInst}')` }}></div>
                  <div className="image cs-lower-card-text">
                     <h2>Experienced Instructors</h2>
                     <p>We prepare students for competitive test like for the Google Coding Contest.</p>
                  </div>
               </div>
               <div className="cs-lower-card">
                  <div className="image cs-lower-card-image" style={{ backgroundImage: `url('${doubt}')` }}></div>
                  <div className="image cs-lower-card-text">
                     <h2>Doubt Clearing Session</h2>
                     <p>We prepare students for competitive test like for the Google Coding Contest.</p>
                  </div>
               </div>
               <div className="cs-lower-card">
                  <div className="image cs-lower-card-image" style={{ backgroundImage: `url('${robotic}')` }}></div>
                  <div className="image cs-lower-card-text">
                     <h2>Robotics Kit</h2>
                     <p>We prepare students for competitive test like for the Google Coding Contest.</p>
                  </div>
               </div>
            </div>
         </div>

      </div>
   )
}
