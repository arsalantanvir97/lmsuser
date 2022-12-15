import React, { useEffect, useState } from "react";

import { connect, useSelector } from "react-redux";

import { withRouter } from "react-router";

import { Link, useHistory } from "react-router-dom";

function ChatScreen() {
  let history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userInfo && window?.ocs) {
      setLoaded(true);

      // console.log(window.ocs)

      window.ocs.init({
        appid: "d9c6677c1079de11c44bf886219b4540",

        appkey: "5895dffd1b229bb0b045824fbd9f2145",

        domain: "dev74.onlinetestingserver.com",

        global: "0",

        id: userInfo?._id,

        toid: "61d8411d3ce7541e30a833cc",

        colorScheme: "a6acad",

        onlyAudio: 0, // will be given if you need audio chat

        element: "#chat",

        disableActionButtons: 0
      });
    }
  }, [userInfo?._id]);

  return (
    <>
      <section>
        <div className="container">
          <div style={{ marginTop: 150 }}>
            {/* {props?.match?.params?.id && ( */}

              <h5 className="fc-dgray" style={{ marginBottom: 30 }}>
            <a onClick={() => history.goBack()}>
                <i className="fas fa-chevron-left fc-dred" /> </a> Inbox
              </h5>
           

            {/* )} */}

            <div id="chat"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatScreen;
