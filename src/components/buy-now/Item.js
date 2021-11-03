import React from "react";
import "./Item.css";
import axios from "axios";
import { useStateValue } from "../Stateprovider";
import { Link } from "react-router-dom";
import { Getcartdata } from "../api/api";
import { IsExist } from "../reducer";

function Item() {
  const [{ basket }, dispatch] = useStateValue();
  const retrievedData = localStorage.getItem('buy-now')
  var buynowdata = JSON.parse(retrievedData);
  console.log(buynowdata);
  const addTocart = () => {
    console.log("product", buynowdata);

    // ***************************changes****************
    let isExist = IsExist(basket, buynowdata[0]);
    if (isExist)
      return;
    const fetchApi = async () => {
      let items = await Getcartdata();
      dispatch({
        type: 'ADD_ALL',
        item: items,
      })
    };
    fetchApi();
    // ***************************changes****************

    const newuser = {
      data_category: buynowdata[1],
      product_type: buynowdata[8],
      new_price: buynowdata[3],
      old_price: buynowdata[4],
      imageurl: buynowdata[5],
      rating: buynowdata[7],
    };
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        data_category: buynowdata[1],
        product_type: buynowdata[8],
        new_price: buynowdata[3],
        old_price: buynowdata[4],
        imageurl: buynowdata[5],
        rating: buynowdata[7],
      },
    });
    // ***************************changes****************

    axios({
      method: 'post', url: `http://localhost:3000/addtocart/${buynowdata[0]}/1`,
      headers: {
        Authorization:
          localStorage.getItem('Token')
      },
    }).then((res) => {

      const fetchApi = async () => {
        let items = await Getcartdata();
        dispatch({
          type: 'ADD_ALL',
          item: items,
        })
      };
      fetchApi();

    }).catch((err) => {
      console.log("Err", err);
      // console.log(err);
    })
    // ***************************changes****************

    // axios({
    //   method: "post",
    //   url: "https://e-commerce-codesandbot.herokuapp.com/addtocart/61330a3bca1623a507108096/3",
    //   data: newuser,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // console.log(basket);

  const buy_now = () => {

    // ***************************changes****************
    let isExist = IsExist(basket, buynowdata[0]);
    if (isExist)
      return;
    axios({
      method: 'post', url: `http://localhost:3000/addtocart/${buynowdata[0]}/1`,
      headers: {
        Authorization:
          localStorage.getItem('Token')
      },
    }).then((res) => {

      const fetchApi = async () => {
        let items = await Getcartdata();
        dispatch({
          type: 'ADD_ALL',
          item: items,
        })
        localStorage.setItem('ownerId', items[0].owner);

      };

      fetchApi();

    }).catch((err) => {
      console.log("Err", err);
      // console.log(err);
    })

  };
  return (
    <>
      <div className="product_container">
        <div className="product_image">
          <i
            class="fa fa-chevron-left sliding_icon_left"
            aria-hidden="true"
          ></i>

          <img src={buynowdata[5]} alt="image not found" />

          <i
            class="fa fa-chevron-right  sliding_icon_right"
            aria-hidden="true"
          ></i>
        </div>
        <div className="product_details">
          <div className="item_category">
            <span className="product_category_details_left">
              {buynowdata[8]}
            </span>
            <span className="product_category_details_right">
              {buynowdata[9]}
            </span>
          </div>
          <div className="product_details_heading">
            <div className="product_title">
              <div className="product_name">
                {buynowdata[2]} Starter Kit
              </div>
              <div className="rating">⭐{buynowdata[7]}</div>
            </div>
            <div className="product_info">
              The Best Starter Kit to make Robotics.
              {/* {product.about_product} */}
            </div>
          </div>

          <div className="product_details_options">
            <div className="about_product">{buynowdata[9]}</div>
            <div className="about_product">100+ MODALS</div>
            <div className="about_product">35+ PARTS</div>
          </div>
          <div className="product_price">
            <div>
              &#8377; &nbsp;
              <span className="product_current_price">{buynowdata[3]}</span>
            </div>

            <div>
              <span className="product_mrp">M.R.P:-</span>
              <span className="product_real_price">
                &#8377; {buynowdata[4]}
              </span>
            </div>
          </div>

          <div className="product_details_buttons">
            <div className="product_details_button">
              <button className="product_buy_button" onClick={(e) => buy_now()}>
                <Link to="/shipping_page">BUY NOW</Link>
              </button>
            </div>
            <div className="product_details_button">
              <button
                className="product_addtocart_button"
                onClick={(e) => addTocart()}
              >
                <i className="fa fa-shopping-cart fa-lg"></i> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
