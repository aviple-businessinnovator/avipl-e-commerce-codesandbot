import React, { useEffect, useState } from "react";
import "./ShippingPage.css";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
import OrderSummaryBody from "../order-summary/order-summary-body/order-summary-body";
import Payment from "../payment/Payment";
import { useStateValue } from "../../Stateprovider";
import { getBasketTotal } from "../../reducer";
import { getBasketTotaldiscount } from "../../reducer";
import axios from "axios";
import { Getcartdata } from "../../api/api";

export const ShippingPage = () => {
  const [{ basket, product }, dispatch] = useStateValue();
  const [formsubmit, setformsubmit] = useState(false);
  // Form validation Logic
  useEffect(() => {
    const fetchgetdata = async () => {
      let items = await Getcartdata();
      dispatch({
        type: 'ADD_ALL',
        item: items,
      })
    };
    if (basket.length == 0)
      fetchgetdata();
  }, [])
  const [user, setuser] = useState({
    Country: "India",
    fullName: "",
    mobileNo: "",
    pinCode: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    addressType: "",
  });

  const [error, seterror] = useState({
    userfullName: "",
    usermobileNo: "",
    userpinCode: "",
    userarea: "",
    usercity: "",
    userstate: "",
    useraddressType: "",
  });

  const [change_deliveryButton, setchange_deliveryButton] = useState(false);
  const [change_orderSummaryButton, setchange_orderSummaryButton] =
    useState(false);

  //creating an Array which contain all the address details,filled by user
  const [addressArray, setaddressArray] = useState([
    {
      Country: "India",
      fullName: "",
      mobileNo: "",
      pinCode: "",
      houseNo: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      addressType: "",
    },
  ]);
  // length of the address array
  const [length, setlength] = useState(0);

  let name, value;
  const getuserdata = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  // function which will run when click on submit button
  const submitdata = (e) => {
    e.preventDefault();
    const { fullName, mobileNo, pinCode, area, city, state, addressType } =
      user;

    const newuser = {
      full_name: fullName,
      phone_no: mobileNo,
      city: city,
      pincode: pinCode,
      state: state,
      line_1: addressType,
      line_2: area,
    };

    var format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;
    // form validation
    if (!fullName.trim()) {
      error.userfullName = "Required";
      seterror(() => ({
        userfullName: error.userfullName,
      }));
    } else if (!mobileNo) {
      error.usermobileNo = "Required";
      seterror(() => ({
        usermobileNo: error.usermobileNo,
      }));
    } else if (mobileNo.length !== 10) {
      error.usermobileNo = "Mobile Number must have 10 digits";
      seterror(() => ({
        usermobileNo: error.usermobileNo,
      }));
    } else if (!pinCode) {
      error.userpinCode = "Required";
      seterror(() => ({
        userpinCode: error.userpinCode,
      }));
    } else if (pinCode.length !== 6) {
      error.userpinCode = "Pincode must have 6 digits";
      seterror(() => ({
        userpinCode: error.userpinCode,
      }));
    } else if (!area.trim()) {
      error.userarea = "Required";
      seterror(() => ({
        userarea: error.userarea,
      }));
    } else if (format.test(area.charAt(0))) {
      error.userarea = "Invalid Address!! Can't use special characters";
      seterror(() => ({
        userarea: error.userarea,
      }));
    } else if (!city.trim()) {
      error.usercity = "Required";
      seterror(() => ({
        usercity: error.usercity,
      }));
    } else if (!state) {
      error.userstate = "Required";
      seterror(() => ({
        userstate: error.userstate,
      }));
    } else if (!addressType) {
      error.useraddressType = "Required";
      seterror(() => ({
        useraddressType: error.useraddressType,
      }));
    } else {
      //set all input addresses in an Array
      setaddressArray([
        ...addressArray,
        {
          id: new Date().getTime().toString(),
          Country: user.Country,
          fullName: user.fullName,
          mobileNo: user.mobileNo,
          pinCode: user.pinCode,
          houseNo: user.houseNo,
          area: user.area,
          landmark: user.landmark,
          city: user.city,
          state: user.state,
          addressType: user.addressType,
        },
      ]);
      setlength(addressArray.length);
      setuser((prevdata) => ({
        ...(prevdata = null),
      }));
      seterror((olddata) => ({
        ...(olddata = null),
      }));
      setchange_deliveryButton(false);
      axios({
        method: "post",
        url: "http://localhost:3000/address",
        data: newuser,
        headers: {
          Authorization: localStorage.getItem('Token')
        },
      })
        .then((res) => {
          setformsubmit(true);
          setTimeout(() => {
            setformsubmit(false);
          }, 700);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {/* Page Options */}

      {formsubmit ? (
        <div className="formsubmit-status"> ✔️Address Saved Successfully</div>
      ) : null}

      <div
        className={
          formsubmit ? "shipping_page shipping_page_opacity" : "shipping_page"
        }
      >
        <div className="page_options">
          <div className="shipping_info">
            <div className="info_option">
              <span className="info_name">1. Login ✔️</span>
              <span className="info_details">+91 {localStorage.getItem('Savedphone')}</span>
            </div>
            <button className="info_button">change</button>
          </div>
          {!change_deliveryButton ? (
            <div className="shipping_info">
              <div className="info_option">
                <span className="info_name">
                  2. DELIVERY ADDRESS {length > 1 ? "✔️" : null}
                </span>
                {length ? (
                  <>
                    <span className="info_details">
                      {addressArray[length].fullName}{" "}
                      {addressArray[length].houseNo} {addressArray[length].area}
                    </span>
                    <span className="info_details">
                      {addressArray[length].pinCode} {addressArray[length].city}{" "}
                      {addressArray[length].state}{" "}
                      {addressArray[length].Country}
                    </span>
                  </>
                ) : null}
              </div>
              <button
                className="info_button"
                onClick={() => setchange_deliveryButton(true)}
              >
                change
              </button>
            </div>
          ) : (
            <form type="submit" onSubmit={submitdata}>
              <div className="saved_delivery_options">
                <span className="delivery_heading">2. DELIVERY ADDRESS </span>
                {addressArray.map((element) => {
                  return (
                    element.fullName && (
                      <div className="saved_details">
                        <div className="saved_name">
                          <input type="radio" />
                          <span>{element.fullName}</span>
                          <span className="saved_addressType">
                            {element.addressType}
                          </span>
                          <span>{element.mobileNo}</span>
                        </div>
                        <div className="saved_address">
                          <small>
                            {element.houseNo} {element.area} {element.landmark}
                          </small>
                          <small>
                            {element.pinCode} {element.city} {element.state}{" "}
                            {element.Country}
                          </small>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>

              <div className="delivery_address_form">
                <div className="add_new_address">
                  <input
                    type="radio"
                    name="new_address"
                    className="new_address_radiobutton"
                  />
                  <small>
                    <b>ADD A NEW ADDRESS</b>
                  </small>
                </div>
                <div>
                  <button className="current_location">
                    {/* <MyLocationIcon /> */}
                    <span className="my_location">Use my current location</span>
                  </button>
                </div>
                <div className="form_input_line">
                  <div className="input_container">
                    <label className="input_label">Country/Region</label>
                    <input
                      name="Country"
                      value="India"
                      onChange={getuserdata}
                      disabled
                      className={
                        error.userCountry
                          ? "input_block select_option error"
                          : "input_block select_option"
                      }
                    />
                    {error.userCountry ? (
                      <small className="errormessage">
                        {error.userCountry}
                      </small>
                    ) : null}
                  </div>
                  <div className="input_container">
                    <label className="input_label">
                      Full Name(First Name and Last Name)
                    </label>
                    <input
                      value={user.fullName}
                      onChange={getuserdata}
                      name="fullName"
                      type="text"
                      className={
                        error.userfullName ? "input_block error" : "input_block"
                      }
                    />
                    {error.userfullName ? (
                      <small className="errormessage">
                        {error.userfullName}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form_input_line">
                  <div className="input_container">
                    <label className="input_label">Mobile Number</label>
                    <input
                      type="number"
                      value={user.mobileNo}
                      onChange={getuserdata}
                      name="mobileNo"
                      placeholder="10-digit number without prefixes"
                      className={
                        error.usermobileNo ? "input_block error" : "input_block"
                      }
                    />
                    {error.usermobileNo ? (
                      <small className="errormessage">
                        {error.usermobileNo}
                      </small>
                    ) : null}
                  </div>
                  <div className="input_container">
                    <label className="input_label">PIN Code</label>
                    <input
                      type="number"
                      value={user.pinCode}
                      onChange={getuserdata}
                      name="pinCode"
                      placeholder="6-digit [0-9] PIN code"
                      className={
                        error.userpinCode ? "input_block error" : "input_block"
                      }
                    />
                    {error.userpinCode ? (
                      <small className="errormessage">
                        {error.userpinCode}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form_input_line">
                  <div className="input_container">
                    <label className="input_label">
                      Flat,HouseNo.,Building
                    </label>
                    <input
                      value={user.houseNo}
                      onChange={getuserdata}
                      name="houseNo"
                      type="text"
                      className="input_block"
                    />
                  </div>
                  <div className="input_container">
                    <label className="input_label">
                      Area,Colony,Street,Village
                    </label>
                    <input
                      value={user.area}
                      onChange={getuserdata}
                      name="area"
                      type="text"
                      className={
                        error.userarea ? "input_block error" : "input_block"
                      }
                    />
                    {error.userarea ? (
                      <small className="errormessage">{error.userarea}</small>
                    ) : null}
                  </div>
                </div>
                <div className="form_input_line">
                  <div className="input_container">
                    <label className="input_label">Landmark</label>
                    <input
                      value={user.landmark}
                      onChange={getuserdata}
                      name="landmark"
                      type="text"
                      className="input_block"
                    />
                    {error.userlandmark ? (
                      <small className="errormessage">
                        {error.userlandmark}
                      </small>
                    ) : null}
                  </div>
                  <div className="input_container">
                    <label className="input_label">Team/City</label>
                    <input
                      value={user.city}
                      onChange={getuserdata}
                      name="city"
                      type="text"
                      className={
                        error.usercity ? "input_block error" : "input_block"
                      }
                    />
                    {error.usercity ? (
                      <small className="errormessage">{error.usercity}</small>
                    ) : null}
                  </div>
                </div>
                <div className="form_input_line">
                  <div className="input_container">
                    <h3 className="delivery_information_heading">
                      Add Delivery Information
                    </h3>
                    <p className="about_delivery">
                      Preferences are used to plan Your delivery.However,
                      shipments can be sometime arrive early or later than
                      planned.
                    </p>
                  </div>
                  <div className="input_container">
                    <label className="input_label">State/Province/Region</label>
                    <input
                      name="state"
                      value={user.state}
                      onChange={getuserdata}
                      placeholder="State"
                      className={
                        error.userstate ? "input_block error" : "input_block"
                      }
                    />
                    {error.userstate ? (
                      <small className="errormessage">{error.userstate}</small>
                    ) : null}
                  </div>
                </div>
                <div className="form_input_line">
                  <div className="input_container">
                    <label className="input_label">Adress Type</label>
                    <select
                      value={user.addressType}
                      onChange={getuserdata}
                      name="addressType"
                      className={
                        error.useraddressType
                          ? "input_block error"
                          : "input_block"
                      }
                    >
                      <option></option>
                      <option>Home</option>
                      <option>Office</option>
                      <option>Other</option>
                    </select>
                    {error.useraddressType ? (
                      <small className="errormessage">
                        {error.useraddressType}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="add_new_address">
                  <input type="checkbox" className="default_checkbox"></input>
                  <small className="default_address">
                    Use as my default address
                  </small>
                </div>
                <div className="form_buttons">
                  <button className="save_button">SAVE AND DELIVER HERE</button>
                  <button
                    className="cancel_button"
                    onClick={() => setchange_deliveryButton(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </form>
          )}
          {!change_orderSummaryButton ? (
            <div className="shipping_info">
              <div className="info_option">
                <span className="info_name">3. ORDER SUMMARY</span>
                <span className="info_details">{basket?.length} Item</span>
              </div>
              <button
                className="info_button"
                onClick={() => setchange_orderSummaryButton(true)}
              >
                change
              </button>
            </div>
          ) : (
            <OrderSummaryBody setchange={setchange_orderSummaryButton} />
          )}
          <Payment />
        </div>

        {/* Price Container */}

        <div className="Price_container">
          <div className="priceDetail">Price Details</div>
          <div className="name_and_price">
            <small>Items:</small>
            <small>&#8377; {getBasketTotal(basket)}</small>
          </div>
          <div className="name_and_price">
            <small>Delivery:</small>
            <small>&#8377; {basket.length ? "120" : "0"}</small>
          </div>
          <div className="name_and_price">
            <small>Total:</small>
            <small>
              &#8377; {basket.length ? getBasketTotal(basket) + 120 : "0"}
            </small>
          </div>
          <div className="name_and_price">
            <small>Promotion Applied:</small>
            <small>- &#8377; {basket.length ? "120" : "0"}</small>
          </div>
          <div className="name_and_price total_order">
            <span>Order Total:</span>
            <span>&#8377; {getBasketTotal(basket)}</span>
          </div>
          <div className="name_and_price">
            <small className="total_savings">Your Savings:</small>
            {basket ? (
              <small className="total_savings">
                &#8377;{getBasketTotaldiscount(basket)}(
                {(
                  ((getBasketTotal(basket) - getBasketTotaldiscount(basket)) /
                    getBasketTotaldiscount(basket)) *
                  100
                ).toFixed(1)}
                %)
              </small>
            ) : (
              <small className="total_savings">&#8377; 0</small>
            )}
          </div>
          <small className="offers">* FREE DELIVERY</small>
          <small className="offers">* Item Discount</small>
        </div>
      </div>
    </>
  );
};

{
  /* Progress Bar */
}
{
  /* <div className="progress_line">
        <div className="progress_container">
          <div className=" circle_container">
            <div className="Shipping_circle first_circle">
              <div className="Shipping_circle second_circle"></div>
            </div>
            <div className="progress_line_names">SHIPPING</div>
          </div>
          <div className="circle_line">
            <span className="line"></span>
          </div>
          <div className="circle_container">
            <div className="OrderSummary_circle first_circle">
              <div className="OrderSummary_circle second_circle"></div>
            </div>
            <div className="progress_line_names">ORDER SUMMARY</div>
          </div>
          <div className="circle_container">
            <div className="Payment_circle first_circle">
              <div className="Payment_circle second_circle"></div>
            </div>
            <div className="progress_line_names">PAYMENT</div>
          </div>
          <div className="circle_container">
            <div className="confirmation_circle first_circle">
              <div className="confirmation_circle second_circle"></div>
            </div>
            <div className="progress_line_names">CONFIRMATION</div>
          </div>
        </div>
      </div> */
}
