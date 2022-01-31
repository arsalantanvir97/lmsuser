import React from 'react'

const Certificate = () => {
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
                        <h1 className="main-heading">Certificates</h1>
                        <p className="note-booking mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, perspiciatis ratione a totam in soluta nostrum nihil repudiandae assumenda ab aut? Veniam dolorum impedit animi culpa. Asperiores aperiam minima quia?</p>
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
                        </div>
                        <div className="clearfix" />
                        <div className="maain-tabble">
                          <table className="table table-striped table-bordered ">
                            <thead>
                              <tr>
                                <th className="d-grey bold">S.No</th>
                                <th className="d-grey bold">Code</th>
                                <th className="d-grey bold">Course Title</th>
                                <th className="d-grey bold">Completion Date</th>
                                <th className="d-grey bold">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>01</td>
                                <td>ABC 123</td>
                                <td>Software</td>
                                <td>02/03/2021</td>
                                <td>
                                  <p className="accepted" data-toggle="modal" data-target="#generate-certificate">Generate Certificate</p>
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

export default Certificate
