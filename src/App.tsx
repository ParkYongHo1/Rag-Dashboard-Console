import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const loadTestApi = async () => {
      try {
        const response = await axios.get("/api/test");
        setMessage(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    loadTestApi();
  }, []);

  return <div>{message}</div>;
}

export default App;
