import React, { useEffect, useState } from "react";
import OrderSummaryCard from "../order-summary-card/order-summary-card";
import "./order-summary-body.css";
import { useStateValue } from "../../../Stateprovider";
import { Getcartdata } from "../../../api/api"

export default function OrderSummaryBody(props) {
  const [{ basket }, dispatch] = useStateValue();
  const [Orders, setOrders] = useState(basket);
  const [quantity, setquantity] = useState(1);
  useEffect(() => {
    const fetchApi = async () => {
      let data = await Getcartdata();
      console.log("Data", data);
    };
    fetchApi();
    // console.log(Dailydata);
  }, [quantity]);
  return (
    // <div className="summary-body">
    <div className="order-summary-body">
      {/* inside body upper part  */}
      {/* <h1 className="order-summary-heading">REVIEW YOUR ORDER</h1> */}
      <OrderSummaryCard
        quantity={quantity}
        setquantity={setquantity}
        order={Orders}
        setOrders={setOrders}
      />
      <div className="form_buttons buttons">
        {Orders.length ? (
          <button
            className="save_button"
            onClick={() => props.setchange(false)}
          >
            SAVE ORDER
          </button>
        ) : null}
        <button
          className="cancel_button"
          onClick={() => props.setchange(false)}
        >
          CANCEL
        </button>
      </div>
    </div>
    // </div>
  );
}
