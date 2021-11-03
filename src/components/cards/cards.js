import React, { useEffect, useState } from 'react'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined'
import './card.css'
import { useStateValue } from '../Stateprovider';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { IsExist } from '../reducer'
import { Getcartdata } from '../api/api'

function Cards({ age, show, setaddtocart, setstatus, id, imageurl, data_category,
    product_type, data, rating, new_price, old_price, about_product, features }) {
    const [{ basket }, dispatch] = useStateValue();
    const [click, setclick] = useState(false);
    const clickhandler = () => {
        setclick(!click);
    }
    const addTocard = () => {
        let isExist = IsExist(basket, id);
        if (isExist) {
            setaddtocart(true);
            setstatus("Already Exist!!");
            setTimeout(() => {
                setaddtocart(false);
                setstatus("✔️ Added to Cart");
            }, 900);
        }
        if (isExist)
            return;
        axios({
            method: 'post', url: `http://localhost:3000/addtocart/${id}/1`,
            headers: {
                Authorization:
                    localStorage.getItem('Token')
            },
            // data: newuser,
            // headers: { Authorization: localStorage.getItem("SavedToken")}
        }).then((res) => {
            setaddtocart(true);
            setTimeout(() => {
                setaddtocart(false);
            }, 900);
            // dispatch({
            //     type: 'ADD_TO_BASKET',
            //     item: {
            //         id: id,
            //         data_category: data_category,
            //         product_type: product_type,
            //         new_price: new_price,
            //         old_price: old_price,
            //         imageurl: imageurl,
            //         rating: rating,
            //         quantity: 1,
            //     }
            // })
            // history.push('/')
            const fetchApi = async () => {
                let items = await Getcartdata();
                dispatch({
                    type: 'ADD_ALL',
                    item: items,
                })
                localStorage.setItem('ownerId', items[0].owner)
            };
            fetchApi();

        }).catch((err) => {
            setaddtocart(true);
            console.log("Err", err);
            setstatus("Not Successfully Added To Cart");
            setTimeout(() => {
                setaddtocart(false);
                setstatus("✔️ Added to Cart");
            }, 900);
            // console.log(err);
        })
    }


    const buy_now = () => {

        const item = {
            id: id,
            data_category: data_category,
            product_type: product_type,
            new_price: new_price,
            age: age,
            data: data,
            old_price: old_price,
            imageurl: imageurl,
            rating: rating,
            quantity: 1,
        }
        dispatch({
            type: 'BUY_NOW',
            item: item
        })

        const quantity = '1';
        const databuy = [id, data_category, product_type, new_price, old_price, imageurl, quantity, rating, data, age];
        localStorage.setItem('buy-now', JSON.stringify(databuy));
        // console.log(product);
    }


    return (
        <div className='cards' style={{ zIndex: show ? -1 : 1 }}>
            <li className="cards-list">
                {/* <button>best seller</button> */}
                <div className="cards-list-link" data_category={data_category} >
                    {/* product image section  */}
                    <figure className="cards-list-picwrap" age={age} data={data}>
                        <img src={imageurl} alt="Travel" className='card-list-img' />
                        {click ? <FavoriteIcon className='like-icon onclick_like_icon' onClick={clickhandler} /> : <FavoriteBorderIcon className='like-icon' onClick={clickhandler} />}
                    </figure>
                    {/* product image section  */}
                    <div className="card-list-info" >
                        {/* rating section  */}
                        <div className='text-rating'>
                            <h3 className='product-card-text'>{product_type}</h3>
                            <div className='product-rating'>
                                <StarOutlinedIcon className='product-star-icon' />
                                <p className='product-rating-point'>{rating}</p>
                            </div>
                        </div>
                        {/* rating section  */}
                        <p>{about_product}</p>
                        {/* price section  */}
                        <h3 className='product-price'>
                            <i className="fas fa-rupee-sign new_price">{new_price}</i>
                            <i className="fas fa-rupee-sign old_price">{old_price}</i>
                        </h3>
                        {/* price section  */}
                        {/* add to cart or buy now  */}
                        <div className='product-option'>
                            <ShoppingCartOutlinedIcon className="card_cart_icons" onClick={(e) => addTocard()} />
                            <Link to='main-page'><button className='product_btn' onClick={(e) => buy_now()}>Buy Now</button></Link>
                        </div>
                        {/* add to cart or buy now  */}
                    </div>
                </div>
            </li>
        </div>
    )
}

export default Cards
