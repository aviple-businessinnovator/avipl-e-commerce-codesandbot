import React, { useEffect, useState } from 'react'
import "./order-summary-card.css"
import { useStateValue } from "../../Stateprovider"
import { getSize } from "../../reducer"
import axios from 'axios';
import { Fetchdata, Getcartdata } from '../../api/api'

export default function OrderSummaryCard({ setOrders, }) {
   const [{ basket }, dispatch] = useStateValue();
   const [getCarts, setgetCarts] = useState([]);
   const [quantityUpdated, setquantityUpdated] = useState(false)
   // *******************fetch cart data ************

   useEffect(() => {
      const fetchgetdata = async () => {
         let items = await Getcartdata();
         dispatch({
            type: 'ADD_ALL',
            item: items,
         })
      };
      if (basket.length == 0) {
         fetchgetdata();
         setgetCarts(basket);
      }
      else
         setgetCarts(basket);
      setquantityUpdated(false);

      console.log(getCarts);
   }, [basket.length, quantityUpdated]);

   // *****************update quantity of product**************

   const onClickHandler = (id, quantity) => {
      // dispatch({ type: "INCREASE_ITEM_QUANTITY", id: id })
      // console.log("update", basket);
      // setOrders(basket);
      quantity = quantity + 1;
      // console.log(getCarts);
      axios({
         method: 'put', url: `http://localhost:3000/updatecart/${id}/${quantity}`,
         headers: {
            Authorization:
               localStorage.getItem('Token')
         },
      }).then((res) => {
         console.log('upadte +++++++++');
         const fetchgetdata = async () => {
            let items = await Getcartdata();
            dispatch({
               type: 'ADD_ALL',
               item: items,
            })
            setquantityUpdated(true);
         };
         fetchgetdata();
         // history.push('/')
      }).catch((err) => {
         console.log(err);
      })
   };


   // *****************remove quantity of product**************

   const onRemoveHandler = (id, quantity) => {
      // dispatch({
      //    type: 'REMOVE_ITEM',
      //    id: id
      // })
      // setOrders(basket);
      let url = '', method = 'put';
      if (quantity == 1) {
         method = 'delete'
         url = `http://localhost:3000/deletecart/${id}`
      }
      else {
         quantity = quantity - 1;
         url = `http://localhost:3000/updatecart/${id}/${quantity}`;
      }
      axios({
         method: method, url: url,
         headers: {
            Authorization:
               localStorage.getItem('Token')
         },
      }).then((res) => {
         const fetchgetdata = async () => {
            let items = await Getcartdata();
            dispatch({
               type: 'ADD_ALL',
               item: items,
            })
         };
         fetchgetdata();
         setquantityUpdated(true)
         // console.log(res);
      }).catch((err) => {
         console.log(err);
      })
   };

   return (
      <div className="order-summary-card2" >
         <div className="order-summary-card-orders-list2">
            {getCarts.length == 0 ? <div style={{ marginLeft: '10px' }}>No Orders Yet!</div> : getCarts.map(({ _id, product, quantity }) => <div className="order-item" key={product.id}>
               <img className="order-item-image2" src={`${product.image}`} alt="item-image"></img>
               <div className="order-item-info2">
                  <h2>{product.name}</h2>
                  <div className="orer-item-sect2">
                     <div className="quantity2">
                        <p id="quantity" className="quantity-value2">{quantity}</p>
                        <div onClick={() => { onClickHandler(_id, quantity) }}>+</div>
                     </div>
                     <p className="price2">&#8377;{product.price * quantity}/-</p>
                  </div>
                  <div className="remove-button2" onClick={() => { onRemoveHandler(_id, quantity); }}>Remove</div>
               </div>
               <div className="delivery-date2">Delivered By {product.delivery_date}</div>
            </div>)}
         </div>
      </div>
   )
}
