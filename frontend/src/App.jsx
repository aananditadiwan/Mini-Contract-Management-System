import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [status, setStatus] = useState({});

  useEffect(() => {
    const statusSocket = new WebSocket('ws://127.0.0.1:8000/ws/contractStatus/');

    statusSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      setStatus(data.status);
      toast.info(data.status)
    };

    statusSocket.onclose = (e) => {
      console.error('WebSocket closed unexpectedly');
    };

    statusSocket.onerror = (e) => {
      console.error('WebSocket error:', e);
    };

    return () => {
      statusSocket.close();
    };
  }, []);


  return (
    <Router>
      <div className="p-4">
        <AppRoutes />
      </div>
      <ToastContainer autoClose={2000} />
    </Router>
  );
};

export default App;
