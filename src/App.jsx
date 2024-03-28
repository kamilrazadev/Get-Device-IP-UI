import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [deviceIp, setDeviceIp] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [reqTxt, setReqTxt] = useState("Send Request");

  // const backendUrl = "http://localhost:3000";
  const backendUrl = "https://get-device-ip-api.vercel.app";

  const getDeviceConfigs = () => {
    const userAgent = navigator.userAgent;

    let deviceType;
    if (/Android/i.test(userAgent)) {
      deviceType = "Android Device";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      deviceType = "iOS Device";
    } else if (/Windows Phone/i.test(userAgent)) {
      deviceType = "Windows Phone";
    } else {
      deviceType = "Unknown Device";
    }

    return { userAgent, deviceType };
  };

  const getDeviceIP = async () => {
    setReqTxt("Please Wait...");
    try {
      const response = await axios.get(`${backendUrl}/get-ip`);
      const { userAgent, deviceType } = getDeviceConfigs();

      setDeviceInfo(userAgent);
      setDeviceType(deviceType);
      setDeviceIp(response.data.ip);
    } catch (error) {
      alert(error.message);
    }
    setReqTxt("Send Request");
  };

  return (
    <>
      <div
        style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
      >
        <h4 style={{ textWrap: "nowrap" }}>Device IP :&nbsp;</h4>{" "}
        <p>{deviceIp}</p>{" "}
      </div>
      <div
        style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
      >
        <h4 style={{ textWrap: "nowrap" }}>Device info : &nbsp;</h4>{" "}
        <p>{deviceInfo}</p>{" "}
      </div>
      <div
        style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}
      >
        <h4 style={{ textWrap: "nowrap" }}>Device Type : &nbsp;</h4>{" "}
        <p>{deviceType}</p>{" "}
      </div>

      <button onClick={getDeviceIP}>{reqTxt}</button>
    </>
  );
}

export default App;
