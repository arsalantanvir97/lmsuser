import React from "react";

const RequestNewAppointment = () => {
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
                          <a href="appointment.php">
                            <h1 className="main-heading">
                              <i className="fas fa-chevron-left" /> Request New
                              Appointment
                            </h1>
                          </a>
                          <div className="clearfix" />
                          <div className="dash-card-inner mt-4">
                            <form action>
                              <div className="row ">
                                <div className="col-12 mt-2 userss">
                                  <label className="all-label2 mb-1">
                                    Course:
                                  </label>
                                  <select
                                    name
                                    id
                                    className="all-input w-100 mb-0"
                                  >
                                    <option value>Information</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label2 mb-1">
                                    Date:
                                  </label>
                                  <input
                                    id="datepicker"
                                    className="sort-date customdate all-input"
                                    placeholder="mm/dd/yyyy"
                                  />
                                  <p className="note-booking">
                                    <span>Note:</span> No Bookings on Sturday
                                    and Sunday
                                  </p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label className="all-label2 mb-1">
                                    Time:
                                  </label>
                                  <input
                                    id="timepicker"
                                    className="sort-date customdate all-input"
                                  />
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-lg-6 mt-2">
                                  <p className="mt-1 d-inline-block mr-3">
                                    <input
                                      type="radio"
                                      id="test1"
                                      name="radio-group"
                                    />
                                    <label
                                      htmlFor="test1"
                                      className="question-label"
                                    >
                                      Text
                                    </label>
                                  </p>
                                  <p className="mt-1 d-inline-block mr-3">
                                    <input
                                      type="radio"
                                      id="test2"
                                      name="radio-group"
                                    />
                                    <label
                                      htmlFor="test2"
                                      className="question-label"
                                    >
                                      Audio Call
                                    </label>
                                  </p>
                                  <p className="mt-1 d-inline-block mr-3">
                                    <input
                                      type="radio"
                                      id="test3"
                                      name="radio-group"
                                    />
                                    <label
                                      htmlFor="test3"
                                      className="question-label"
                                    >
                                      Video Call
                                    </label>
                                  </p>
                                </div>
                                <div className="col-lg-6 mt-2">
                                  <label htmlFor className="course-label">
                                    Cost:
                                  </label>
                                  <p htmlFor className="question-label mt-1">
                                    $100
                                  </p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-12 mt-2 userss">
                                  <label className="all-label2 mb-1 d-block">
                                    Description:
                                  </label>
                                  <textarea
                                    name
                                    id
                                    rows={8}
                                    className="w-100 all-input-textarea"
                                    placeholder="Enter Description"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 text-center mt-3">
                                  <button
                                    type="button"
                                    className="green-btn"
                                    data-toggle="modal"
                                    data-target="#appointment-type"
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
                            </form>
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
        id="appointment-type"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content pb-5">
            <button
              type="button"
              className="close text-right mr-1 mt-1"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="pt-1 text-center">
              <h2 className="modal-appointment">Appointment Type</h2>
              <h2 className="modal-appointment-video">Video Call</h2>
            </div>
            <div className="debit-div">
              <p className="debit mt-2">Payment Details</p>
              <p className="debit mt-2">Card (Debit or Credit)</p>
              <p className="credit-cards">Credits Cards</p>
              <img src="images/visa.png" alt="" className="debit-img" />
              <img src="images/master.png" alt="" className="mx-1 debit-img" />
              <img src="images/discover.png" alt="" className="debit-img" />
              <div className="mt-3">
                <label className="all-label2 ml-2 mb-1">Card Number</label>
                <input
                  type="text"
                  className="w-90 all-input"
                  placeholder="Enter Card Number"
                />
              </div>
              <div className="mt-1">
                <label className="all-label2 ml-2 mb-1">Expiration Date</label>
                <input
                  type="text"
                  className="w-90 all-input"
                  placeholder="Enter Expiration Date"
                />
              </div>
              <div className="mt-1">
                <label className="all-label2 ml-2 mb-1">CVV</label>
                <input
                  type="text"
                  className="w-90 all-input"
                  placeholder="Enter CVV"
                />
              </div>
              <div className="mt-1">
                <label className="all-label2 ml-2 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  className="w-90 all-input"
                  placeholder="Enter Cardholder Name"
                />
              </div>
            </div>
            <div className="text-center">
              <a
                href="#_"
                className="modal-btn d-inline-block mt-2 py-1"
                data-toggle="modal"
                data-dismiss="modal"
                aria-label="Close"
                data-target="#request-forword"
              >
                Make Payment
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="request-forword"
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
                Your appointment request is
                <br />
                successfully forwarded
                <br />
                to admin.
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

export default RequestNewAppointment;
