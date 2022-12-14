import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import React, { useEffect, useState } from "react";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../Redux/Constants/ProductConstants";
import moment from "moment";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}&size=${size}&color=${color}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  console.log(product);

  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-count col-lg-7 mb-3">
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Gi??</h6>
                        <span>{(product.price / 1000).toFixed()}.000 VND</span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>S??? l?????ng</h6>
                        <span>{product.countInStock}</span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Nh???n x??t</h6>
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} ????nh gi??`}
                        />
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Size</h6>
                        <select
                          id="product_size"
                          className="form-select"
                          required
                          onChange={(e) => setSize(e.target.value)}
                        >
                          {product?.size?.map((size) => (
                            <option value={size.label}>{size.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>M??u s???c</h6>
                        <select
                          id="product_color"
                          className="form-select"
                          required
                          onChange={(e) => setColor(e.target.value)}
                        >
                          {product?.color?.map((color) => (
                            <option value={color.label}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                      {product.countInStock > 0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>S??? l?????ng</h6>
                            <input
                              type="number"
                              name="qty"
                              min="0"
                              max={product.countInStock}
                              onChange={(e) => {
                                if (e.target.value > product.countInStock) {
                                  e.target.value = product.countInStock;
                                }
                                setQty(e.target.value);
                              }}
                            />
                          </div>
                          <button
                            onClick={AddToCartHandle}
                            className="round-black-btn"
                          >
                            Th??m v??o gi??? h??ng
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <span className="product-name">M?? t???</span>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* RATING */}
        <div className="row my-5">
          <div className="col-md-6">
            <h6 className="mb-3">????NH GI??</h6>
            {product.reviews.length === 0 && (
              <Message variant={"alert-info mt-3"}>Ch??a c?? ????nh gi??</Message>
            )}
            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
              >
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <span>{moment(review.createdAt).calendar()}</span>
                <div className="alert alert-info mt-3">{review.comment}</div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <h6>VI???T B??I ????NH GI?? C???A KH??CH H??NG</h6>
            <div className="my-4">
              {loadingCreateReview && <Loading />}
              {errorCreateReview && (
                <Message variant="alert-danger">{error}</Message>
              )}
            </div>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-4">
                  <strong>X???p h???ng</strong>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="col-12 bg-light p-3 mt-2 border-0 rounded"
                  >
                    <option value="">L???a ch???n...</option>
                    <option value="1">1 - T???</option>
                    <option value="2">2 - T???m ???n</option>
                    <option value="3">3 - T???t</option>
                    <option value="4">4 - R???t t???t</option>
                    <option value="5">5 - Tuy???t v???i</option>
                  </select>
                </div>
                <div className="my-4">
                  <strong>Nh???n x??t</strong>
                  <textarea
                    row="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="col-12 bg-light p-3 mt-2 border-0 rounded"
                  ></textarea>
                </div>
                <div className="my-3">
                  <button
                    disabled={loadingCreateReview}
                    className="col-12 bg-black border-0 p-3 rounded text-white"
                  >
                    TH??M
                  </button>
                </div>
              </form>
            ) : (
              <div className="my-3">
                <Message variant={"alert-warning"}>
                  Xin vui l??ng{" "}
                  <Link to="/login">
                    " <strong>????ng nh???p</strong> "
                  </Link>{" "}
                  ????? vi???t b??nh lu???n{" "}
                </Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
