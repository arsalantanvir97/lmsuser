import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CoursePayment = () => {
  return (
    <>
      <section className="admin-profile">
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-body">
              {/* Basic form layout section start */}
              <section id="configuration user-management">
                <div className="row">
                  <div className="col-12">
                    <div className="card jost pad-20 pb-5 px-lg-4 px-2">
                      <div className="card-content collapse show">
                        <div className="card-body table-responsive card-dashboard">
                          <Link to='/PaymentLogs'>
                            <h1 className="main-heading">
                              <i className="fas fa-chevron-left" /> Payments
                            </h1>
                          </Link>
                          <div className="clearfix" />
                          <div className="dash-card-inner mt-4">
                            <section className>
                              <div className="container">
                                <div className="row justify-content-center">
                                  <div className="col-lg-8 col-12">
                                    <form id="msform">
                                      {/* progressbar */}
                                      <ul id="progressbar" className="pl-0">
                                        <li className="active">
                                          <h3 className="medium">Address</h3>
                                          <i className="user-card" />
                                        </li>
                                        <li>
                                          <h3 className="medium">Payment</h3>
                                          <i className="payment" />
                                        </li>
                                        <li>
                                          <h3 className="medium">Confirm</h3>
                                          <i className="check" />
                                        </li>
                                      </ul>
                                      {/* fieldsets */}
                                      <fieldset>
                                        <div className="row">
                                          <div className="col-md-6 col-sm-12">
                                            <div className="form-field">
                                              <label
                                                htmlFor
                                                className="all-label2 mb-1"
                                              >
                                                Email Address
                                              </label>
                                              <input
                                                type="email"
                                                placeholder="Enter Email Address"
                                                className="site-input"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <div className="form-field">
                                              <label
                                                htmlFor
                                                className="all-label2 mb-1"
                                              >
                                                Phone
                                              </label>
                                              <input
                                                type="number"
                                                name="number"
                                                className="site-input"
                                                placeholder="Enter Phone Number "
                                              />
                                            </div>
                                          </div>
                                          {/* <div class="col-12">
                                                                      <div class="d-flex align-items-center">
                                                                          <h5 class="text-uppercase mr-3 mb-0">Billing Address</h5>
                                                                          <p class="mb-0">
                                                                              <input type="checkbox" id="c1" name="cb" />
                                                                              <label for="c1" class="mb-0 grey-text">Save Address for next purchase</label>
                                                                          </p>
                                                                      </div>
                                                                      <hr class="mt-5" />
                                                                  </div> */}
                                          <div className="col-md-6 col-sm-12">
                                            <div className="form-field">
                                              <label
                                                htmlFor
                                                className="all-label2 mb-1"
                                              >
                                                User Name
                                              </label>
                                              <input
                                                type="text"
                                                name="name"
                                                className="site-input"
                                                placeholder="Enter User Name"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          {/* <div class="col-md-6 col-sm-12">
                                                                      <div class="form-field">
                                                                          <label for="">Address line 1</label>
                                                                          <input type="text" name="name" class="site-input" placeholder="Enter Address Line 1 " />
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-md-6 col-sm-12">
                                                                      <div class="form-field">
                                                                          <label for="">Address line 2</label>
                                                                          <input type="text" name="name" class="site-input" placeholder="Enter Address Line 2 " />
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-md-6 col-sm-12">
                                                                      <div class="form-field">
                                                                          <label for="">City</label>
                                                                          <input type="text" name="name" class="site-input" placeholder="Enter City" />
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-md-6 col-sm-12">
                                                                      <div class="form-field">
                                                                          <label for="">State</label>
                                                                          <input type="text" name="name" class="site-input" placeholder="Enter State " />
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-md-6 col-sm-12">
                                                                      <div class="form-field">
                                                                          <label for="">Zip Code</label>
                                                                          <input type="number" class="site-input" placeholder="Enter Zip Code " />
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-md-6 col-sm-12">
                                                                      <div class="form-field">
                                                                          <label for="">Country</label>
                                                                          <input type="text" name="name" class="site-input" placeholder="Enter Country" />
                                                                      </div>
                                                                  </div> */}
                                          {/* <div class="col-12">
                                                                      <p class="black-text">
                                                                          <input type="checkbox" id="shipAd" name="radio-group" />
                                                                          <label for="shipAd" class="bordered">Ship to a different location</label>
                                                                      </p>
                                                                  </div>
                                                                  <div class="shipping-address-div" style="display: none">
                                                                      <div class="row ml-0 mr-0">
                                                                          <div class="col-md-6 col-sm-12">
                                                                              <div class="form-field">
                                                                                  <label for="">User Name</label>
                                                                                  <input type="text" name="name" class="site-input" placeholder="Enter User Name" />
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                      <div class="row">
                                                                          <div class="col-md-6 col-sm-12">
                                                                              <div class="form-field">
                                                                                  <label for="">Address line 1</label>
                                                                                  <input type="text" name="name" class="site-input" placeholder="Enter Address Line 1 " />
                                                                              </div>
                                                                          </div>
                                                                          <div class="col-md-6 col-sm-12">
                                                                              <div class="form-field">
                                                                                  <label for="">Address line 2</label>
                                                                                  <input type="text" name="name" class="site-input" placeholder="Enter Address Line 2 " />
                                                                              </div>
                                                                          </div>
                                                                          <div class="col-md-6 col-sm-12">
                                                                              <div class="form-field">
                                                                                  <label for="">City</label>
                                                                                  <input type="text" name="name" class="site-input" placeholder="Enter City" />
                                                                              </div>
                                                                          </div>
                                                                          <div class="col-md-6 col-sm-12">
                                                                              <div class="form-field">
                                                                                  <label for="">State</label>
                                                                                  <input type="text" name="name" class="site-input" placeholder="Enter State " />
                                                                              </div>
                                                                          </div>
                                                                          <div class="col-md-6 col-sm-12">
                                                                              <div class="form-field">
                                                                                  <label for="">Zip Code</label>
                                                                                  <input type="number" class="site-input" placeholder="Enter Zip Code " />
                                                                              </div>
                                                                          </div>
                                                                          <div class="col-md-6 col-sm-12">
                                                                              <div class="form-field">
                                                                                  <label for="">Country</label>
                                                                                  <input type="text" name="name" class="site-input" placeholder="Enter Country" />
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div> */}
                                        </div>
                                        <div className="text-center">
                                          <input
                                            type="button"
                                            name="next"
                                            className="next site-btn l-blue-btn gren-btn"
                                            defaultValue="Continue"
                                          />
                                        </div>
                                      </fieldset>
                                      <fieldset>
                                        <div className="row justify-content-center">
                                          <div className="col-md-8 col-sm-12">
                                            <div className="form-field">
                                              <label
                                                htmlFor
                                                className="all-label2 mb-1"
                                              >
                                                Card Holder's Name:
                                              </label>
                                              <input
                                                type="text"
                                                name="name"
                                                className="site-input"
                                                placeholder="Enter Card Holder Name"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-8 col-sm-12">
                                            <div className="form-field">
                                              <label
                                                htmlFor
                                                className="all-label2 mb-1"
                                              >
                                                Card Number:
                                              </label>
                                              <input
                                                type="number"
                                                name="number"
                                                className="site-input"
                                                placeholder="Enter Card Number"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-8 col-sm-12">
                                            <div className="form-field">
                                              <label
                                                htmlFor
                                                className="all-label2 mb-1"
                                              >
                                                CVV Number:
                                              </label>
                                              <input
                                                type="number"
                                                name="number"
                                                className="site-input"
                                                placeholder="Enter CVV Number"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-8 col-sm-12">
                                            <div className="form-field">
                                              <label
                                                htmlFor
                                                className="all-label2 mb-1"
                                              >
                                                Expiry Month/Year:
                                              </label>
                                              <input
                                                type="number"
                                                className="site-input"
                                                placeholder="mm/yyyy"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-center">
                                          <input
                                            type="button"
                                            name="previous"
                                            className="previous site-btn gren-btn"
                                            defaultValue="Previous"
                                          />
                                          <input
                                            type="button"
                                            name="next"
                                            className="next site-btn l-blue-btn gren-btn"
                                            defaultValue="Continue"
                                          />
                                        </div>
                                      </fieldset>
                                      <fieldset>
                                        <div className="table-responsive right">
                                          <table className="table shopping-cart-wrap cart m-0">
                                            <tbody>
                                              <tr>
                                                <td className="step-td-hading">
                                                  Course Details
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div className="img-wrap">
                                                    <img
                                                      src="images/course-register.png"
                                                      className="img-fluid step-form-img w-100"
                                                      alt=""
                                                    />
                                                  </div>
                                                </td>
                                                <td className="align-middle">
                                                  <div className="row">
                                                    <div className="col-6">
                                                      <p className="step-table-p">
                                                        Course Code:
                                                      </p>
                                                      <p className="step-table-p">
                                                        Cost
                                                      </p>
                                                      <p className="step-table-p">
                                                        Start Date
                                                      </p>
                                                    </div>
                                                    <div className="col-6">
                                                      <p className="step-table-p-value">
                                                        ABC
                                                      </p>
                                                      <p className="step-table-p-value">
                                                        $30
                                                      </p>
                                                      <p className="step-table-p-value">
                                                        02/01/2021
                                                      </p>
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="align-middle">
                                                  <div className="row">
                                                    <div className="col-6">
                                                      <p className="step-table-p">
                                                        Course Title:
                                                      </p>
                                                      <p className="step-table-p">
                                                        Duartion
                                                      </p>
                                                      <p className="step-table-p">
                                                        Ending Date
                                                      </p>
                                                    </div>
                                                    <div className="col-6">
                                                      <p className="step-table-p-value">
                                                        Software
                                                      </p>
                                                      <p className="step-table-p-value">
                                                        03 Months
                                                      </p>
                                                      <p className="step-table-p-value">
                                                        02/01/2021
                                                      </p>
                                                    </div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div className="text-center mt-2">
                                          <input
                                            type="button"
                                            name="previous"
                                            className="previous site-btn gren-btn"
                                            defaultValue="Previous"
                                          />
                                          <button
                                            type="button"
                                            className="site-btn l-blue-btn gren-btn"
                                            data-toggle="modal"
                                            data-target="#enrolled-course"
                                          >
                                            Place Order
                                          </button>
                                        </div>
                                      </fieldset>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* // Basic form layout section end */}
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade"
        id="enrolled-course"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <img src="images/green-check.png" alt="" className="img-fluid" />
              <p className="modalpp">
                Your are successfully
                <br />
                enrolled in ABC Course
                <br />
              </p>
              <div className="text-center">
                <a
                  href="#_"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="modal-btn"
                >
                  OK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="invalid-card"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <img src="images/question.png" alt="" className="img-fluid" />
              <p className="modalpp">
                Please provide valid
                <br />
                card details
                <br />
              </p>
              <div className="text-center">
                <a
                  href="#_"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="modal-btn"
                >
                  OK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="no-balance"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 pb-5 text-center">
              <img src="images/question.png" alt="" className="img-fluid" />
              <p className="modalpp">
                There isn't enough amount <br />
                in your card.
                <br />
                Please try another card.
              </p>
              <div className="text-center">
                <a
                  href="#_"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="modal-btn"
                >
                  OK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePayment;
