import React, { useState, useEffect } from "react";
import "./product.css";
import { Fetchdata } from "../api/api";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Cards from "../cards/cards";
import { useStateValue } from "../Stateprovider";
import { getBasketTotal } from "../reducer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "../drop-down/Modal/Modal";
import OrderSummary from "../drop-down/order-summary/order-summary";
import Spinner from "../spinner/spinner"

function Product() {
  const [{ basket }, dispatch] = useStateValue();
  const [Dailydata, setDailydata] = useState([]);
  const history = useHistory();
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false)
  const onbackdropHandler = () => {
    setshow(!show);
  };
  useEffect(() => {
    const fetchApi = async () => {
      setloading(true)
      setDailydata(await Fetchdata());
      setloading(false)
    };
    fetchApi();
    // console.log(Dailydata);
  }, [setDailydata]);
  const [addtocartclick, setaddtocartclick] = useState(false);
  const [addtocartstatus, setaddtocartstatus] = useState("✔️ Added To Cart");

  return (
    <>
      {addtocartclick ? (
        <div className="addtocart-status">{addtocartstatus}</div>
      ) : null}

      <div
        className={
          addtocartclick
            ? "product-container product-opacity"
            : "product-container"
        }
      >
        {/* product navbar  */}
        <div className="product-category">
          <Modal show={show} backdropHandler={onbackdropHandler}>
            <OrderSummary closeHandler={onbackdropHandler} />
          </Modal>
          <div className="products">
            {/* <h3 className='category_heading'>ALL  PRODUCT</h3> */}
            <div className="category-heading">
              ALL PRODUCT
            </div>
            <div>
              <ShoppingCartOutlinedIcon
                className="cart-icons"
                onClick={() => {
                  onbackdropHandler();
                }}
              />
              <span className="basket-length">{basket?.length}</span>
            </div>
          </div>
          <ul className="category-options">
            <li>ALL</li>
            <li>ROBOTICS</li>
            <li>IOT</li>
            <li>CODING</li>
            <li>VEDIC MATHS</li>
          </ul>
        </div>
        {/* product navbar  */}
        {/* product section  */}
        {loading ? <Spinner /> : <div className="product-section">
          {/* Recommended section  */}
          <div className="recommended-section">
            <h3 className="recommended-heading">Recommended Kits</h3>
            <div className='cards-item'>
              {Dailydata?.map((item) => {
                // console.log(item);
                return (
                  <Cards
                    age='10+ Age'
                    show={show}
                    setaddtocart={setaddtocartclick}
                    setstatus={setaddtocartstatus}
                    id={item._id}
                    imageurl={item.image}
                    data_category='best seller'
                    data={item.category}
                    product_type={item.name}
                    rating={item.rating}
                    new_price={item.discountedPrice}
                    old_price={item.price}
                    about_product={item.description}
                    features={item.features}
                  />
                )
              })}
            </div>
          </div>
          {/* Recommended section  */}
          {/* other section  */}
          <div className="other-section">
            <h3 className="other-heading">Other Kits</h3>
            <div className='cards-item'>
              {Dailydata?.map((item) => {
                // console.log(item);
                return (
                  <Cards
                    age='10+ Age'
                    show={show}
                    setaddtocart={setaddtocartclick}
                    setstatus={setaddtocartstatus}
                    id={item._id}
                    imageurl={item.image}
                    data_category='best seller'
                    data={item.category}
                    product_type={item.name}
                    rating={item.rating}
                    new_price={item.discountedPrice}
                    old_price={item.price}
                    about_product={item.description}
                    features={item.features}
                  />
                )
              })}
            </div>
          </div>
          {/* other section  */}
        </div>}
        {/* product section  */}
      </div>
    </>
  );
}

export default Product;
