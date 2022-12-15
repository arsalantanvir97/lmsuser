import { toast } from "react-toastify";
import * as VoxImplant from "voximplant-websdk";

export const voxAPI = VoxImplant.getInstance();

let currentCall, outboundCall;

const onConnectionEstablished = () => {
  console.log("CONNECT. OK");
};

const onConnectionFailed = () => {
  console.log("CONNECT. FAIL");
  setTimeout(function () {
    connectVox();
  }, 1000);
};

const onConnectionClosed = () => {
  console.log("CONNECT. CLOSE");
  setTimeout(function () {
    connectVox();
  }, 1000);
};

const onAuthResult = (e) => {
  console.log("AuthResult: " + e.result);
  if (!e.result) {
    // Wrong username or password
    alert("Wrong username or password was specified");
    console.log("Code: " + e.code);
  }
};

const onCallConnected = (e, setCallState) => {
  console.log("CallConnected: ", currentCall);
  setCallState(2);
  voxAPI.sendVideo(true);
  currentCall.showRemoteVideo(true);
};

const onCallDisconnected = (e, handleModal, setCallState, setMuteState) => {
  console.log("CALL. DISCONNECT");
  setCallState(1);
  console.log(handleModal());
  setMuteState(false);
  handleModal(false, false, null, false);
  toast("CALL ENDED");
};

const onCallFailed = (e, handleModal) => {
  console.log("CALL. FAIL");
  toast.error("Call Refused");
  console.log(handleModal());
  handleModal(false, false, null, false);
};

const onCallUpdated = (e) => {
  console.log("CALL UPDATED: ", e);
};

export const initVox = async () => {
  try {
    await voxAPI
      .init({
        micRequired: true, // force microphone/camera access request
        videoSupport: true, // enable video support
        progressTone: true, // play progress tone
        localVideoContainerId: "voximplant_container", // element id for local video from camera or screen sharing
        remoteVideoContainerId: "voximplant_container"
      })
      .then((res) => {
        console.log("VOX INIT. OK");
      })
      .catch((err) => {
        console.log(err?.message);
        if (err?.message === "WebSDK already initialized") {
        }
      });
    voxAPI.on(VoxImplant.Events.ConnectionEstablished, onConnectionEstablished);
    voxAPI.on(VoxImplant.Events.ConnectionFailed, onConnectionFailed);
    voxAPI.on(VoxImplant.Events.ConnectionClosed, onConnectionClosed);
    voxAPI.on(VoxImplant.Events.AuthResult, onAuthResult);
  } catch (err) {
    console.log("ERROR. INIT ", err);
  }
};

export const connectVox = async () => {
  try {
    await voxAPI.connect();
  } catch (err) {
    console.log("CONNECT. FAIL", err);
  }
};

export const login = async (
  username,
  password,
  application_name,
  account_name
) => {
  try {
    console.log(
      username + "@" + application_name + "." + account_name + ".voximplant.com"
    );
    await voxAPI.login(
      username +
        "@" +
        application_name +
        "." +
        account_name +
        ".voximplant.com",
      password
    );
  } catch (err) {
    console.log("LOGIN. FAIL");
  }
};

export const createCall = (
  username_to,
  receiveVideo,
  sendVideo,
  handleModal,
  setCallState,
  setMuteState
) => {
  console.log(`TRYING OUTBOUND CALL TO ${username_to}`);
  let _currentCall;
  let _outboundCall;
  _outboundCall = _currentCall = voxAPI.call({
    number: username_to,
    video: {
      receiveVideo: receiveVideo,
      sendVideo: sendVideo
    },
    customData: "OUT_BOUND_CALL"
  });
  currentCall = _currentCall;
  outboundCall = _outboundCall;
  _currentCall.on(VoxImplant.CallEvents.Connected, (e) => {
    onCallConnected(e, setCallState);
  });
  _currentCall.on(VoxImplant.CallEvents.Disconnected, (e) =>
    onCallDisconnected(e, handleModal, setCallState, setMuteState)
  );
  _currentCall.on(VoxImplant.CallEvents.Failed, (e) =>
    onCallFailed(e, handleModal)
  );
  handleModal(true, receiveVideo, _currentCall, true);
};

export const onIncomingCall = (e, handleModal, setCallState, setMuteState) => {
  currentCall = e.call;
  currentCall.on(VoxImplant.CallEvents.Connected, (e) => {
    onCallConnected(e, setCallState);
  });
  currentCall.on(VoxImplant.CallEvents.Disconnected, (e) =>
    onCallDisconnected(e, handleModal, setCallState, setMuteState)
  );
  currentCall.on(VoxImplant.CallEvents.Failed, onCallFailed);
  currentCall.on(VoxImplant.CallEvents.ActiveUpdated, onCallUpdated);
  console.log("Incoming call from: " + currentCall.number());
};

export const acceptCall = (receiveVideo, sendVideo) => {
  console.log("REC, SEND, VID", receiveVideo, sendVideo, currentCall);
  currentCall.answer(
    null,
    {},
    {
      receiveVideo,
      sendVideo
    }
  );
};

export const refuseCall = () => {
  currentCall.decline();
};

export const endCall = (setMuteState) => {
  currentCall.hangup();
  setMuteState(false);
};

export const muteMicrophone = () => {
  currentCall.muteMicrophone();
};

export const unmuteMicrophone = () => {
  currentCall.unmuteMicrophone();
};

export const toggleVideo = (status) => {
  currentCall.sendVideo(status);
};
