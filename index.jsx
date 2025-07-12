
import { useEffect, useState } from "react";

export default function SignalDashboard() {
  const [signal, setSignal] = useState("Loading...");
  const [lastUpdated, setLastUpdated] = useState("");
  const [auth, setAuth] = useState(false);
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");

  const fetchSignal = async () => {
    try {
      const res = await fetch("/api/signal");
      const data = await res.json();
      setSignal(data.signal);
      setLastUpdated(new Date(data.timestamp).toLocaleTimeString());
    } catch (err) {
      setSignal("Error fetching signal");
    }
  };

  useEffect(() => {
    if (auth) {
      fetchSignal();
      const interval = setInterval(fetchSignal, 25000);
      return () => clearInterval(interval);
    }
  }, [auth]);

  const handleLogin = () => {
    if (inputUser === "Jesuslove" && inputPass === "Jenifer250@") {
      setAuth(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!auth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Jenifer's Signal Bot</h1>
        <input
          type="text"
          placeholder="Username"
          value={inputUser}
          onChange={(e) => setInputUser(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={inputPass}
          onChange={(e) => setInputPass(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">Jenifer's Signal Bot</h1>
      <div className="text-xl font-semibold mb-2">
        Current Signal: {signal === "BUY" ? "🟢 BUY" : signal === "SELL" ? "🔴 SELL" : "⚪ IDLE"}
      </div>
      <div className="text-gray-500">Last updated: {lastUpdated}</div>
    </div>
  );
}
