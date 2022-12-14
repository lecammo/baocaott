import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.imtemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.imtemsPrice > 300 ? 0 : 30);

  cart.taxPrice = addDecimals(Number((0.05 * cart.imtemsPrice)));

  cart.totalPrice = (
    Number(cart.imtemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);
  console.log(cart);
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        imtemsPrice: cart.imtemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Kh??ch h??ng</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Th??ng tin ?????t h??ng</strong>
                </h5>
                <p>Qu???c gia: {cart.shippingAddress.country}</p>
                <p>Ph????ng th???c thanh to??n: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>?????a ch??? giao h??ng</strong>
                </h5>
                <p>
                  ?????a ch???:{""}
                  {cart.shippingAddress.address}, {""}
                  {cart.shippingAddress.city}, {""}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Gi??? h??ng b???n ??ang tr???ng</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-2 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex justify-content-center align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-1  d-flex align-items-center flex-column justify-content-center ">
                      <h4>S??? L?????NG</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-1 col-1  d-flex align-items-center flex-column justify-content-center ">
                      <h4>SIZE</h4>
                      <h6>{item.size}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-1  d-flex align-items-center flex-column justify-content-center ">
                      <h4>M??U S???C</h4>
                      <h6>{item.color}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>T???m t??nh</strong>
                  </td>
                  <td> {(cart.imtemsPrice/1000).toFixed()}.000 VND</td>
                </tr>
                <tr>
                  <td>
                    <strong>Ph?? ship</strong>
                  </td>
                  <td> {cart.shippingPrice} VND</td>
                </tr>
                <tr>
                  <td>
                    <strong>GTGT</strong>
                  </td>
                  <td>{(cart.taxPrice/1000).toFixed()}.000 VND</td>
                </tr>
                <tr>
                  <td>
                    <strong>T???ng c???ng</strong>
                  </td>
                  <td>{(cart.totalPrice/1000).toFixed()}.000 VND</td>
                </tr>
              </tbody>
            </table>

            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                <Link to="/order" className="text-white">
                  ?????T H??NG
                </Link>
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
