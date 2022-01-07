import React from 'react'

const PaymentLogs = () => {
    return (
        <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration">
              <div className="row">
                <div className="col-12">
                  <div className="card user-management">
                    <div className="card-content collapse show">
                      <div className="card-body table-responsive card-dashboard">
                        <h1 className="main-heading">Payment Logs</h1>
                        <div className="clearfix" />
                        <div className="row mt-1">
                          <div className="col-lg-6 col-12">
                            <div className="d-flex align-items-center">
                              <p className="l-grey source f-20 d-lg-inline-block">Sort By:</p>
                              <div className="ml-2">
                                <p className="l-grey source mb-1">From</p>
                                <input id="datepicker" className="sort-date customdate" />
                              </div>
                              <div className="ml-2">
                                <p className="l-grey source mb-1">To</p>
                                <input id="datepicker2" className="sort-date customdate" />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 text-right mb-3">
                            <select name id className="genaral-select">
                              <option value>Select</option>
                              <option value>Purchased Course</option>
                              <option value>Appointment Booked</option>
                            </select>
                          </div>
                        </div>
                        <div className="clearfix" />
                        <div className="maain-tabble">
                          <table className="table table-striped table-bordered zero-configuration">
                            <thead>
                              <tr>
                                <th className="d-grey bold">S.No</th>
                                <th className="d-grey bold">Code</th>
                                <th className="d-grey bold">Course Title</th>
                                <th className="d-grey bold">Type</th>
                                <th className="d-grey bold">Cost</th>
                                <th className="d-grey bold">Date</th>
                                <th className="d-grey bold">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>01</td>
                                <td>ABC 123</td>
                                <td>Software</td>
                                <td>Purchased Course</td>
                                <td>$100</td>
                                <td>02/03/2021</td>
                                <td>
                                  <div className="btn-group mr-1 mb-1">
                                    <button type="button" className="btn btn-drop-table btn-sm" data-toggle="dropdown"><i className="fa fa-ellipsis-v" /></button>
                                    <div className="dropdown-menu">
                                      <a className="dropdown-item" href="payment-log-details.php"><i className="fa fa-eye" />View </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
      
    )
}

export default PaymentLogs
   