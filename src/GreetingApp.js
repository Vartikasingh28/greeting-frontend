import { useState } from "react";

export default function GreetingApp() {
  const [name, setName] = useState(""); // Stores user input
  const [greeting, setGreeting] = useState(""); // Stores API response
  const [error, setError] = useState(""); // Stores error message
  const [loading, setLoading] = useState(false); // Loading state

  const fetchGreeting = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      setGreeting("");
      return;
    }

    setLoading(true);
    setError("");
    setGreeting("");

    try {
      const response = await fetch(
        `https://greeting-backend.onrender.com/api/greet?name=${name}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch greeting.");
      }

      const data = await response.json();

      if (data.message) {
        setGreeting(data.message);
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error fetching greeting:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Greeting App</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={fetchGreeting} style={{ padding: "10px" }} disabled={loading}>
        {loading ? "Loading..." : "Get Greeting"}
      </button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
      {greeting && <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>{greeting}</p>}
    </div>
  );
}
