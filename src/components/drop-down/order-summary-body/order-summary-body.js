import React, { useEffect, useState } from 'react'
import OrderSummaryCard from '../order-summary-card/order-summary-card'
import "./order-summary-body.css"
import { useStateValue } from "../../Stateprovider";
import { GetCart } from '../../api/api';


export default function OrderSummaryBody() {
   const [{ basket }, dispatch] = useStateValue();
   const [Orders, setOrders] = useState(basket);
   const [quantity, setquantity] = useState(1);

   // console.log(basket, Orders);
   useEffect(() => {
      setOrders(basket);
   }, [basket])

   return (
      <div className="order-summary-body">
         <OrderSummaryCard
            setOrders={setOrders}
         />
      </div>
   )
}
