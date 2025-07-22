

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/GiveKudos.css";

export default function GiveKudos() {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [quota, setQuota] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const [usersRes, quotaRes] = await Promise.all([
          api.get("users/available/"),
          api.get("kudos/quota/"),
        ]);
        setUsers(usersRes.data);
        setQuota(quotaRes.data.remaining_kudos);
      } catch (err) {
        setError("Error loading user list or quota.");
        console.error(err);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("kudos/give/", { receiver_id: receiver, message });
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.receiver_id?.join(" ") ||
        "Failed to give kudos.";
      setError(msg);
    }
  };

  return (
    <div className="givekudos-wrapper">
      <form onSubmit={handleSubmit} className="givekudos-card">
        <h1 className="givekudos-title">Give Kudos</h1>

        {quota === 0 ? (
          <p className="givekudos-error">You have no kudos left this week.</p>
        ) : (
          <>
            <label>Choose a teammate</label>
            <select
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="givekudos-select"
            >
              <option value="">-- Select --</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>

            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="givekudos-input"
              rows={3}
              placeholder="Why are you giving kudos?"
            />

            {error && <p className="givekudos-error">{error}</p>}

            <button
              type="submit"
              className="givekudos-button"
              disabled={!receiver || !message || quota === 0}
            >
              Send Kudos
            </button>
          </>
        )}
      </form>
    </div>
  );
}
