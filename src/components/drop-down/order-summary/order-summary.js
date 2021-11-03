import React, { useEffect, useState } from 'react'
import OrderSummaryBody from '../order-summary-body/order-summary-body'
import "./order-summary.css"
import { useHistory } from "react-router";
// import CloseIcon from '@mui/icons-material/Close';
import { getBasketTotal, getSize, getBasketTotaldiscount } from "../../reducer";
import { useStateValue } from "../../Stateprovider";
import { Fetchdata, Getcartdata } from "../../api/api"

export default function OrderSummary({ closeHandler }) {
   const [{ basket }, dispatch] = useStateValue();
   let history = useHistory();
   useEffect(() => {
      const fetchgetdata = async () => {
         let items = await Getcartdata();
         dispatch({
            type: 'ADD_ALL',
            item: items,
         })
         if (items.length == 0) {
            return;
         }
      };
      if (basket.length == 0)
         fetchgetdata();
   }, [basket.length])

   return (
      <div className="order-summary">
         <div className="order-summary-header"><h1>Shopping Cart({getSize(basket)} items)</h1>
            {/* <CloseIcon onClick={() => { closeHandler() }} className="close" />  */}
         </div>
         <div className="order-summary-container">
            <OrderSummaryBody
            />
         </div>
         <div className="order-summary-footer">
            <div className="left-left">
               <p className=" u">SubTotal</p>
               <div className="totalprice">$ {getBasketTotal(basket)}</div>
               <div className="lupper-text">Inclusive all taxes and shiping across India</div>
            </div>
            <div className="right-right">
               <div className="place-order-btn" onClick={() => { let bask = getSize(basket); if (bask > 0) history.push('/shipping_page') }}>Place your order</div>
            </div>
         </div>
      </div >
   )
}
