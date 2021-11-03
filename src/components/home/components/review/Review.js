import React from 'react';
import './Review.css';
import reviewImage from '../../asserts/images/profile_image.jpg';


function Review() {
    return (<div className="review_cards card">
        <img src={reviewImage} alt="" />

        <div className="card_text">

            This is best course where i got to do amazing live projects. I have built an amazing self driven toy car which has motivated to do more projects.

        </div>
        <div className="card_bottom">
            <div className="card_name">
                Juilia Roy
            </div>
            <div className="card_rating">
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <span>4.5</span>
            </div>
        </div>
    </div>


    )
}

export default Review;
