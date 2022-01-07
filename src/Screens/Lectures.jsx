import React from 'react'

const Lectures = () => {
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
                  <h1 className="main-heading">Lectures</h1>
                  <div className="row my-2 ">
                    <div className="col-lg-3 userss">
                      <p className="label-value mb-1">Course</p>
                      <select name id className="form-control">
                        <option value>Introduction</option>
                      </select>
                    </div>
                    <div className="col-lg-9 text-right">
                      <a href="view-lectures.php" className="gren-btn d-inline-block">View Lectures</a>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="row">
                    <div className="col-12">
                      <h3 className="course-dtl">Course Details</h3>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-lg-4">
                      <label htmlFor className="course-lbll mt-1">Course Title:</label>
                      <p className="course-vlue mt-1">Course A</p>
                    </div>
                    <div className="col-lg-4">
                      <label htmlFor className="course-lbll mt-1">Charges:</label>
                      <p className="course-vlue mt-1">$100</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <label htmlFor className="course-lbll mt-1">Duration:</label>
                      <p className="course-vlue mt-1">03 Months</p>
                    </div>
                    <div className="col-lg-4">
                      <label htmlFor className="course-lbll mt-1">Category:</label>
                      <p className="course-vlue mt-1">ABC Category</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-4">
                      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <a className="nav-link active" id="pills-overview-tab" data-toggle="pill" href="#pills-overview" role="tab" aria-controls="pills-overview" aria-selected="true">Course Overview</a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a className="nav-link" id="pills-lectures-tab" data-toggle="pill" href="#pills-lectures" role="tab" aria-controls="pills-lectures" aria-selected="false">Lectures</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-overview" role="tabpanel" aria-labelledby="pills-overview-tab">
                          <div className="row">
                            <div className="col-12">
                              <h3 className="course-heading-3 mt-2">Description</h3>
                              <p className="details-p">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <h3 className="course-heading-3">Features of Course</h3>
                              <p className="details-p">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 text-center mt-5">
                              <a href="#_" className="gren-btn d-inline-block">Generate Certificate</a>
                            </div>
                            {/*======================================================= Disabled Btn Html ==========================================================================*/}
                            {/* <div class="col-12 text-center mt-5">
    <a href="#_" class="disabled-btn d-inline-block">Generate Certificate</a>
                                              </div>
                                          </div>
                                          <div class="tab-pane fade" id="pills-lectures" role="tabpanel" aria-labelledby="pills-lectures-tab">
                                              <div class="maain-tabble">
                                                  <table class="table table-striped table-bordered zero-configuration">
                                                      <tbody>
                                                          <tr>
                                                              <td>
                                                                  <div>
                                                                      <input type="checkbox" id="c1" name="cb" class="d-none">
                                                                      <label for="c1" class="">Lecture 01</label>
                                                                  </div>
                                                              </td>
                                                              <td>Lecture title</td>
                                                              <td>30 Mins</td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </div>
                                              <div class="row">
                                                  <div class="col-12 text-center mt-5">
                                                      <a href="#_" class="gren-btn d-inline-block">Generate Certificate</a>
                                                  </div>
                                                  <!--======================================================= Disabled Btn Html ==========================================================================*/}
                            {/* <div class="col-12 text-center mt-5">
                                                      <a href="#_" class="disabled-btn d-inline-block">Generate Certificate</a>
                                                  </div> */}
                            {/*======================================================= Disabled Btn Html ==========================================================================*/}
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Lectures
