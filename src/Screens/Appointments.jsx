import React from "react";
import { Link } from "react-router-dom";

const Appointments = () => {
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
                  <h1 className="main-heading">Appointments</h1>
                  <div className="clearfix" />
                  <div className="row">
                    <div className="col-12 text-right my-2">
                      <a href="request-new-appointment.php" className="green-btn">Request New Appointment</a>
                    </div>
                  </div>
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
                  </div>
                  <div className="clearfix" />
                  <div className="maain-tabble">
                    <table className="table table-striped table-bordered zero-configuration">
                      <thead>
                        <tr>
                          <th className="d-grey bold">S.No</th>
                          <th className="d-grey bold">Course Code</th>
                          <th className="d-grey bold">Course Title</th>
                          <th className="d-grey bold">Date</th>
                          <th className="d-grey bold">Starting Time</th>
                          <th className="d-grey bold">Ending Time</th>
                          <th className="d-grey bold">Cost</th>
                          <th className="d-grey bold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>ABC 123</td>
                          <td>Software</td>
                          <td>02/03/2021</td>
                          <td>10:00 AM</td>
                          <td>10:00 AM</td>
                          <td>$100</td>
                          <td>
                            <p className="d-green">Completed</p>
                          </td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>ABC 123</td>
                          <td>Software</td>
                          <td>02/03/2021</td>
                          <td>10:00 AM</td>
                          <td>10:00 AM</td>
                          <td>$100</td>
                          <td>
                            <p className="orange">Pending</p>
                          </td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>ABC 123</td>
                          <td>Software</td>
                          <td>02/03/2021</td>
                          <td>10:00 AM</td>
                          <td>10:00 AM</td>
                          <td>$100</td>
                          <td>
                            <p className="red">Canelled</p>
                          </td>
                        </tr>
                        <tr>
                          <td>01</td>
                          <td>ABC 123</td>
                          <td>Software</td>
                          <td>02/03/2021</td>
                          <td>10:00 AM</td>
                          <td>10:00 AM</td>
                          <td>$100</td>
                          <td>
                            <p className="accepted">Join Chat</p>
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

  );
};

export default Appointments;
