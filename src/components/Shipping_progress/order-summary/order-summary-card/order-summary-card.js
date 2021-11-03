import React, { useEffect, useState } from "react";
import "./order-summary-card.css";
import { useStateValue } from "../../../Stateprovider"
import axios from "axios";
import { Getcartdata } from "../../../api/api";
export default function OrderSummaryCard({
  order,
  setOrders,
}) {
  const [getCarts, setgetCarts] = useState([])
  const [{ basket }, dispatch] = useStateValue();


  // *******************fetch cart data ************

  useEffect(() => {
    const fetchgetdata = async () => {
      let items = await Getcartdata();
      console.log("itemss>", items);
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
    console.log(getCarts);

  }, [basket.length]);

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
      // console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  };



  return (
    <div className="order-summary-card">
      <div className="order-summary-card-header delivery_heading">
        <span>3.</span>ORDER SUMMARY ✔️
      </div>
      <div className="order-summary-card-orders-list ">
        {basket.length == 0 ? (
          <div style={{ marginLeft: "10px" }}>No Orders Yet!</div>
        ) : (
          basket.map(({ _id, product, quantity }) =>
          // (
          {
            console.log(product);
            return <div className="order-item" key={product.id}>
              <img
                className="order-item-image"
                src={`${product.image}`}
                alt="item-image"
              ></img>
              <div className="order-item-info">
                <h2>{product.name}</h2>
                <div className="orer-item-sect">
                  <div className="quantity">
                    <p id="quantity" className="quantity-value">
                      {quantity}
                    </p>
                    <div
                      onClick={() => {
                        onClickHandler(_id, quantity);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <p className="price">&#8377;{parseInt(product.price) * parseInt(quantity)}/-</p>
                </div>
                <div
                  className="remove-button"
                  onClick={() => {
                    onRemoveHandler(_id, quantity);
                  }}
                >
                  Remove
                </div>
              </div>
              <div className="delivery-date">
                Delivered By {product.delivery_date || ' '}
              </div>
            </div>
          }
            // )
          )
        )}
      </div>
    </div>
  );
}
