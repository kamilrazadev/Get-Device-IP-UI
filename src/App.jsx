import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [deviceIp, setDeviceIp] = useState("");
  // const backendUrl = "http://localhost:3000";
  const backendUrl = "https://get-device-ip-api.vercel.app";

  const getDeviceIP = async () => {
    try {
      const response = await axios.get(`${backendUrl}/get-ip`);
      setDeviceIp(response.data.ip);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>Device IP: {deviceIp}</div>
      <button onClick={getDeviceIP}>Send Request</button>
    </>
  );
}

export default App;
