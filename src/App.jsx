import { useState } from "react";
import "./App.css";
import axios from "axios";
import Fingerprint2 from "fingerprintjs2";

function App() {
  const [deviceIp, setDeviceIp] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [reqTxt, setReqTxt] = useState("Send Request");
  const [deviceFingerPrint, setDeviceFingerPrint] = useState("");

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

  const getDeviceFingerPrint = async () => {
    try {
      const components = await new Promise((resolve, reject) => {
        Fingerprint2.get((components) => {
          resolve(components);
        });
      });
      const values = components.map((component) => component.value);
      const murmur = Fingerprint2.x64hash128(values.join(""), 31);
      console.log(murmur);
      return murmur;
    } catch (error) {
      console.error("Error generating fingerprint:", error);
      throw error;
    }
  };

  const getDeviceIP = async () => {
    setReqTxt("Please Wait...");
    try {
      const response = await axios.get(`${backendUrl}/get-ip`);
      const { userAgent, deviceType } = getDeviceConfigs();
      const deviceFingerPrint = await getDeviceFingerPrint();

      setDeviceFingerPrint(deviceFingerPrint);
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
      <div style={{ marginBottom: "10px", textAlign: "start" }}>
        <h4
          style={{
            textWrap: "nowrap",
            margin: "0",
            color: "#0390fc",
          }}
        >
          Device IP :&nbsp;
        </h4>{" "}
        <p style={{ margin: "0" }}>{deviceIp}</p>{" "}
      </div>

      <div style={{ marginBottom: "10px", textAlign: "start" }}>
        <h4 style={{ textWrap: "nowrap", margin: "0", color: "#0390fc" }}>
          Device info : &nbsp;
        </h4>{" "}
        <p style={{ margin: "0" }}>{deviceInfo}</p>{" "}
      </div>

      <div style={{ marginBottom: "10px", textAlign: "start" }}>
        <h4 style={{ textWrap: "nowrap", margin: "0", color: "#0390fc" }}>
          Device Type : &nbsp;
        </h4>{" "}
        <p style={{ margin: "0" }}>{deviceType}</p>{" "}
      </div>

      <div style={{ marginBottom: "10px", textAlign: "start" }}>
        <h4 style={{ textWrap: "nowrap", margin: "0", color: "#0390fc" }}>
          Device Fingerprint : &nbsp;
        </h4>{" "}
        <p style={{ margin: "0" }}>{deviceFingerPrint}</p>{" "}
      </div>

      <button onClick={getDeviceIP}>{reqTxt}</button>
    </>
  );
}

export default App;
