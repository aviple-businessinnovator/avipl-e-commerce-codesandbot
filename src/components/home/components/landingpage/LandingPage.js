import React from 'react';
import './LandingPage.css';
import Review from '../review/Review';
import SlidingIcon from '../slidingIcon/SlidingIcon';
import childImage from '../../asserts/images/school-boy-yellow-shirt-taking-virtual-classes-raising-hand 1.png';
// import rocketImage from '../../asserts/images/rocket.png';
// import rocketImage2 from '../../asserts/images/rocket_image.png';
import womenImage1 from '../../asserts/images/happy-woman-pointing-copy-space-whiteboard 2.png';
import { NavLink } from 'react-router-dom';

function LandingPage() {





    return (
        <>
            <div className="landing_page_container">

                {/* mission section */}
                <div className="landing_page_mission_section">

                    {/* <img src={rocketImage2} alt="" /> */}
                    <h1>Our  <span className="heading_color">Mission</span> </h1>
                    <p>Is To Teach 21st Century Skills Like Coding,Robotics,Internet Of Things For Free To Kids To Give Them The Exposure At An Early Age.</p>
                </div>

                {/* doubt section */}

                <div className="landing_page_doubt_section">
                    <div className="landing_page_doubt_section_image">
                        <img src={childImage} alt="" />
                    </div>
                    <div className="landing_page_doubt_section_text">
                        <h1>
                            Free Doubt Sessions</h1>
                        <p>Learning Will be Fun, Because Our Industry Experts Will Always Be there for Free to help clear the doubts of students and guide them while they learn various technologies and get hands on experience on their enrolled courses.</p>
                    </div>

                </div>
                <SlidingIcon />

                {/* benchmarking section */}
                <div className="landing_page_benchmarking_section">

                    <div className="landing_page_benchmarking_left_section">
                        <h1 className="heading_color" >Benchmarking</h1>
                        <table>
                            <tr>
                                <th></th>
                                <th>   Codesandbots          </th>
                                <th>Others</th>


                            </tr>

                            <tr>
                                <td id="column1">Students Performance shared with Parents</td>
                                <td><i class="fa fa-check" aria-hidden="true"></i></td>
                                <td><i class="fa fa-times" aria-hidden="true"></i></td>

                            </tr>
                            <tr>
                                <td id="column1">Coding classes provided</td>
                                <td><i class="fa fa-check" aria-hidden="true"></i></td>
                                <td><i class="fa fa-check" aria-hidden="true"></i></td>

                            </tr>
                            <tr>
                                <td id="column1">Robotics classes Provided</td>
                                <td><i class="fa fa-check" aria-hidden="true"></i></td>
                                <td><i class="fa fa-times" aria-hidden="true"></i></td>

                            </tr>

                            <tr>
                                <td id="column1">IOT classes Provided</td>
                                <td><i class="fa fa-check" aria-hidden="true"></i></td>
                                <td><i class="fa fa-times" aria-hidden="true"></i></td>

                            </tr>

                            <tr>
                                <td id="column1">Robotics kit Provided</td>

                                <td><i class="fa fa-check" aria-hidden="true"></i></td>
                                <td><i class="fa fa-times" aria-hidden="true"></i></td>

                            </tr>


                            <tr>
                                <td id="column1">Live Projects with Advanced Technology</td>
                                <td><i class="fa fa-check"></i></td>
                                <td><i class="fa fa-times" aria-hidden="true"></i></td>

                            </tr>


                            <tr>

                                <td id="column1">Free Learning and Doubt Clearing Classes</td>


                                <td><i class="fa fa-check" aria-hidden="true"></i></td>

                                <td><i class="fa fa-times" aria-hidden="true"></i></td>
                            </tr>

                        </table>
                    </div>



                    <div className="landing_page_benchmarking_section_cornerimage">
                        {/* <img src={rocketImage} alt="" /> */}
                    </div>

                </div>

                {/* review section */}
                <h1 className="review_section_heading">Reviews</h1>

                <div className="landing_page_reviews_section">


                    <Review />
                    <Review />

                </div>

                <div className="landing_page_reviews_section_responsive">


                    <Review />

                </div>
                <SlidingIcon />

                {/* learning section */}
                <div className="landing_page_learning_section">
                    <div className="heading_section">
                        <p>Projects</p>
                        <h1>Students will learn to <span className="heading_color">build</span> </h1>

                    </div>
                    <div className="images_section">
                        <div className="images_row1">
                            <div className="images_row1_column1">App and website</div>
                            <div className="images_row1_column2">
                                <div className="images_row1_column2_row1">Games</div>
                                <div className="images_row1_column2_row2">Smart Home</div>
                            </div>
                            <div className="images_row1_column3">Drone</div>
                        </div>
                        <div className="images_row2">
                            <div className="images_row2_column1">Self Driven Car</div>
                            <div className="images_row2_column2">Satellite-Image Capture</div>
                        </div>
                    </div>

                </div>

                {/* feature section */}
                <div className="landing_page_feature_section">

                    <div className="left_section">
                        <h1>How we help <span className="heading_color"> you become better</span>?</h1>
                        <p>21st century workforce will be centered around new computational technologies like ML, AI, VR, AR, Blockchain, IoT and Robotics. An early start to coding will make them the creators of tomorrow.</p>
                        <ul>
                            <li>Build logical thinking</li>
                            <li>Sharpen problem solving</li>
                            <li>Increase concentration</li>
                            <li>Foster imagination and creativity</li>
                            <li>Enhances their ability to build</li>
                            <li>Opens up career opportunities</li>
                        </ul>
                        <NavLink to="/sign-in"> <button className="sign_up">
                            Sign Up
                        </button></NavLink>
                    </div>
                    <div className="right_section">
                        <img src={childImage} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;
