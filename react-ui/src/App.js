import React, { Component } from 'react';

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {selfeasyrtcid:"",haveSelfVideo:false};
    this.loginSuccess = this.loginSuccess.bind(this);
    this.convertListToButtons = this.convertListToButtons.bind(this);
  }
  
  componentDidMount()
  {
    // Sets calls so they are automatically accepted (this is default behaviour)
    window.easyrtc.setAcceptChecker((easyrtcid, callback) => {
    this.callback(true);
    });
    this.connect();
  }
  
  connect() {
   window.easyrtc.setSocketUrl("http://localhost:8080");	
   window.easyrtc.enableDebug(false);
   window.easyrtc.setRoomOccupantListener(this.convertListToButtons);
   window.easyrtc.easyApp("easyrtc.demo10", "selfVideo",["callerVideo", "callerVideo2", "callerVideo3","callerVideo4","callerVideo5"], this.loginSuccess, this.loginFailure);
  }
  
  convertListToButtons (roomName, occupants, isPrimary) {
   this.setState({occupants:occupants});
  }
  
  callKaro()
  {
     let array = this.state.occupants;
     for(var i in array)
     {
     this.performCall(array[i].easyrtcid);
     }
     this.setState({});
  }

  performCall(othereasyrtcid) {
   var acceptedCB = (accepted, easyrtcid) => {
     if( !accepted ) {
       alert("Sorry, your call to " + easyrtcid + " was rejected");
     }
   };
   var successCB = () => {};
   var failureCB = () => {};
   window.easyrtc.call(othereasyrtcid, successCB, failureCB, acceptedCB);
  }


  loginSuccess(easyrtcid) {
    this.setState({selfeasyrtcid:easyrtcid});
    document.getElementById("iam").innerHTML = "I am " + window.easyrtc.cleanId(easyrtcid);
  }
  
  
  loginFailure(errorCode, message) {
   window.easyrtc.showError(errorCode, message);
  }


  render() {
    return (
     <div id="demoContainer">
          <div id="connectControls">
            <div id="iam">Not yet connected...</div>
            <br />
            <strong>Connected users:</strong>
            <div id="otherClients"></div>
            <input type="button" value="call" onClick={this.callKaro.bind(this)}/>
          </div>
          <div id="videos">
            <video  autoPlay="autoplay" id="selfVideo" className="window.easyrtcMirror"></video>
            <video  autoPlay="autoplay" id="callerVideo" className="callerVideo"></video>
            <video  autoPlay="autoplay" id="callerVideo2" className="callerVideo"></video>
            <video  autoPlay="autoplay" id="callerVideo3" className="callerVideo"></video>
            <video  autoPlay="autoplay" id="callerVideo4" className="callerVideo"></video>
            <video  autoPlay="autoplay" id="callerVideo5" className="callerVideo"></video>
          </div>
        </div>
    );
  }
}

export default App;
