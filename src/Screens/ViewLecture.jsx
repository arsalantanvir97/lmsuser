import React from 'react'

const ViewLecture = () => {
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
                            <h3 className="course-dtl">Lecture Details</h3>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-4">
                            <label htmlFor className="course-lbll mt-1">Lecture No:</label>
                            <p className="course-vlue mt-1">01</p>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor className="course-lbll mt-1">Lecture Title:</label>
                            <p className="course-vlue mt-1">ABC</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <label htmlFor className="course-lbll mt-1">Lecture Duration:</label>
                            <p className="course-vlue mt-1">30 Mins</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mt-2">
                            <video className="w-100" poster="images/video-play.png" controls>
                              <source src="images/mov_bbb.mp4" type="video/mp4" />
                            </video>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 mt-2">
                            <a href="#_" className="gren-btn d-inline-block">Previous</a>
                          </div>
                          <div className="col-lg-4 mt-2 text-lg-center">
                            <a href="#_" className="disabled-btn-2 d-inline-block">Take Quiz</a>
                          </div>
                          <div className="col-lg-4 mt-2 text-lg-right">
                            <a href="#_" className="disabled-btn-2 d-inline-block">Next</a>
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

export default ViewLecture
