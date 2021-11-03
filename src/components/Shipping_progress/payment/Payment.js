import React from "react";
import "./Payment.css";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
const Payment = () => {
  const handlePayment = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load.Are you online?");
      return;
    }
    const data = await fetch("http://localhost:5000/razorpay", {
      method: "POST",
    })
      .then((t) => t.json())
      .catch((e) => console.log(e));

    // console.log(data);

    const options = {
      key: "rzp_test_6KjaPF6vK633Tf",
      amount: data.amount.toString(),
      currency: "INR",
      name: "Codes and Bots",
      description: "Codes and Bots - E-commerece website",
      image: "./logo/codesandbots_logo.PNG",
      order_id: data.id,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="shipping_info">
      <div className="info_option">
        <span className="info_name">4. PAYMENT OPTIONS</span>
        <span className="info_details">Pay on Delivery</span>
      </div>
      <button className="info_button" id="rzp-button1" onClick={handlePayment}>
        Pay
      </button>
    </div>
  );
};

export default Payment;
