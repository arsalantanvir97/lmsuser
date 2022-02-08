import { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  acceptCall,
  endCall,
  muteMicrophone,
  refuseCall,
  toggleVideo,
  unmuteMicrophone,
} from "../../../config/vox";
import { handleModal, handleVideoState } from "../../../actions/User.action";
import ElapsedTime from "./ElapsedTimer";

import "./ModalStyle.css";

import { FormattedMessage } from "react-intl";

Modal.setAppElement("#root");

function ModalMain({
  modalOpen,
  isVideoCall,
  handleModal,
  incommingCall,
  callState,
  muteState,
  setMuteState,
  isOutgoing,
  videoState,
  handleVideoState,
}) {
  console.log("isOutgoing: ", isOutgoing);

  const IncommingCall = () => {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <div
            style={{
              borderRadius: 60,
              background: "#FF3A31",
              padding: 20,
            }}
            onClick={() => {
              refuseCall();
              handleModal(false, false, {});
              toast.warning("CALL REJECTED");
            }}
          >
            <i
              className="fa fa-phone fa-rotate-180"
              aria-hidden="true"
              style={{ fontSize: 32, color: "white" }}
            ></i>
          </div>
          <br />
          <p style={{ color: "#FF3A31", fontSize: 18, fontWeight: "bold" }}>
            <FormattedMessage id="reject" />
          </p>
        </div>
        <div
          style={{ marginLeft: 120, textAlign: "center", cursor: "pointer" }}
        >
          <div
            style={{
              borderRadius: 60,
              background: "#47AA2C",
              padding: 20,
            }}
            onClick={() => {
              acceptCall(isVideoCall, isVideoCall);
            }}
          >
            <i
              className="fa fa-phone fa-rotate-90"
              aria-hidden="true"
              style={{ fontSize: 32, color: "white" }}
            ></i>
          </div>
          <br />
          <p style={{ color: "#47AA2C", fontSize: 18, fontWeight: "bold" }}>
            <FormattedMessage id="accept" />
          </p>
        </div>
      </div>
    );
  };

  const CallConnected = () => {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            marginTop: 10,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              borderRadius: 60,
              background: "grey",
              padding: 20,
            }}
            onClick={() => {
              if (!muteState) muteMicrophone();
              else unmuteMicrophone();
              setMuteState(!muteState);
            }}
          >
            {!muteState ? (
              <i
                className="fas fa-microphone"
                aria-hidden="true"
                style={{ fontSize: 16, color: "white" }}
              ></i>
            ) : (
              <i className="fas fa-microphone-slash"></i>
            )}
          </div>
        </div>
        <div
          style={{
            marginLeft: 120,
            textAlign: "center",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              borderRadius: 60,
              background: "#FF3A31",
              padding: 20,
            }}
            onClick={() => {
              endCall(setMuteState);
              handleModal(false, false, {});
            }}
          >
            <i
              className="fa fa-phone fa-rotate-180"
              aria-hidden="true"
              style={{ fontSize: 32, color: "white" }}
            ></i>
          </div>
          <br />
          <p style={{ color: "#FF3A31", fontSize: 18, fontWeight: "bold" }}>
            <FormattedMessage id="end" />
          </p>
        </div>
        {isVideoCall && (
          <div
            style={{
              marginLeft: 120,
              textAlign: "center",
              cursor: "pointer",
              marginTop: 10,
              zIndex: 9999,
            }}
          >
            <div
              style={{
                borderRadius: 60,
                background: "grey",
                padding: 20,
              }}
              onClick={() => {
                toggleVideo(!videoState);
                handleVideoState(!videoState);
              }}
            >
              {videoState ? (
                <i
                  className="fas fa-video"
                  aria-hidden="true"
                  style={{ fontSize: 16, color: "white" }}
                ></i>
              ) : (
                <i
                  className="fas fa-video-slash"
                  style={{ fontSize: 16, color: "white" }}
                ></i>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        // isOpen={true}
        isOpen={modalOpen}
        onRequestClose={null}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "1px solid black",
            width: "80%",
            height:
              callState === 2 && isVideoCall
                ? "100%"
                : callState === 1
                ? "unset"
                : "100%",
          },
        }}
        contentLabel="Example Modal"
      >
        {console.log("isOutgoing: ", isOutgoing)}
        <div id="voximplant_container"></div>
        {!isOutgoing ? (
          <>
            <div
              className={
                callState === 2 && isVideoCall && "modal-content-video"
              }
            >
              {callState === 1 && (
                <>
                  <h1 style={{ textAlign: "center" }}>
                    {isVideoCall
                      ? "Incoming Video Call"
                      : "Incoming Audio Call"}
                  </h1>
                  <br />
                  <br />
                </>
              )}
              {!isVideoCall && (
                <div style={{ textAlign: "center" }}>
                  <img
                    src="https://i1.wp.com/roohentertainment.com/wp-content/uploads/2018/06/user-avatar-1.png?ssl=1"
                    style={{ width: 162, height: 162 }}
                  />
                </div>
              )}
              <h1
                style={{
                  textAlign: "center",
                  color: "#0b369c",
                  fontSize: 24,
                  marginTop: 32,
                }}
              >
                {incommingCall?.call?.settings?.displayName?.split("_")[0]}
              </h1>
              <div style={{ textAlign: "center" }}>
                {callState === 2 && <ElapsedTime />}
              </div>

              {callState === 1
                ? IncommingCall()
                : callState === 2
                ? CallConnected()
                : null}
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              position: callState === 2 && "absolute",
              left: callState === 2 && "-50%",
              right: callState === 2 && "-50%",
              bottom: callState === 2 && 60,
            }}
          >
            {(!isVideoCall || callState === 1) && (
              <img
                src="https://i1.wp.com/roohentertainment.com/wp-content/uploads/2018/06/user-avatar-1.png?ssl=1"
                style={{ width: 162, height: 162 }}
              />
            )}
            {callState === 1 && (
              <>
                <h1 style={{ textAlign: "center" }}>Ringing</h1>
              </>
            )}
            <h1
              style={{
                textAlign: "center",
                color: "#0b369c",
                fontSize: 24,
                marginTop: 32,
              }}
            >
              {incommingCall?.settings?.number?.split("_")[0]}
            </h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {callState === 1 ? (
                <div
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      borderRadius: 60,
                      background: "#FF3A31",
                      padding: 20,
                    }}
                    onClick={() => {
                      endCall(setMuteState);
                      handleModal(false, false, {});
                    }}
                  >
                    <i
                      className="fa fa-phone fa-rotate-180"
                      aria-hidden="true"
                      style={{ fontSize: 32, color: "white" }}
                    ></i>
                  </div>
                  <br />
                </div>
              ) : callState === 2 ? (
                <>
                  <div
                    style={{
                      textAlign: "center",
                      position: "absolute",
                      marginTop: -36,
                    }}
                  >
                    {callState === 2 && <ElapsedTime />}
                  </div>
                  {CallConnected()}
                </>
              ) : null}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  modalOpen: state.userReducer.modalOpen,
  isVideoCall: state.userReducer.isVideoCall,
  incommingCall: state.userReducer.incommingCall,
  isOutgoing: state.userReducer.outgoing,
  videoState: state.userReducer.videoState,
});

export default connect(mapStateToProps, { handleModal, handleVideoState })(
  ModalMain
);
