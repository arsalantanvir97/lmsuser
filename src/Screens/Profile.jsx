import React from 'react'

const Profile = () => {
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
                      <h1 className="main-heading">Profile Information</h1>
                      <div className="row">
                        <div className="col-12 text-center">
                          <img src="images/user-profilee.png" alt="" className="my-proflie-img" />
                          <a href="change-password.php" className="chg-pwdd">Change Password</a>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-lg-6">
                          <div className="row">
                            <div className="col-lg-3">
                              <label className="all-label2">Full Name:</label>
                            </div>
                            <div className="col-lg-3">
                              <p className="label-value2 profilee-lbll">Mark Carson</p>
                            </div>
                            <div className="col-lg-3">
                              <label className="all-label2">Email:</label>
                            </div>
                            <div className="col-lg-3">
                              <p className="label-value2 profilee-lbll">abc@xyz.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row my-lg-5 my-3">
                        <div className="col-12 text-center">
                          <a href="edit-profile.php" className="green-btn">Edit Profile</a>
                        </div>
                      </div>
                      <div className="clearfix" />
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

export default Profile
