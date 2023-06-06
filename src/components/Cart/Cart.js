import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CheckOut from "./CheckOut";
import CheckoutLatest from "./CheckoutLatest";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckOut, setCheckout] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setCheckout(true);
  };

  const hideCheckout = () => {
    setCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    setSubmitting(true);
    await fetch(
      "https://react-http-958f9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        // <CheckOut
        //   onConfirm={submitOrderHandler}
        //   onHideCheckOut={hideCheckout}
        // />
        <CheckoutLatest
          onConfirm={submitOrderHandler}
          onHideCheckOut={hideCheckout}
        />
      )}
      {!isCheckOut && modalActions}
    </Fragment>
  );

  const isSubmittingContent = <p>Sending Order Data...</p>;

  const didSubmittingModalContent = (
    <Fragment>
      <p>Successfully Sent the Order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
