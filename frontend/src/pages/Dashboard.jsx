import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [kudos, setKudos] = useState([]);
  const [quota, setQuota] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, kudosRes, quotaRes] = await Promise.all([
          api.get("me/"),
          api.get("kudos/received/"),
          api.get("kudos/quota/"),
        ]);
        setUser(userRes.data);
        setKudos(kudosRes.data);
        setQuota(quotaRes.data.remaining_kudos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!user) return <div className="dashboard-wrapper">Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <h1>Hello, {user.username}</h1>
            <p>{user.organization.name}</p>
            <p>
              Kudos remaining: <strong>{quota}</strong>
            </p>
          </div>
          <button
            onClick={() => navigate("/give")}
            className="kudos-button"
            disabled={quota === 0}
          >
            Give Kudos
          </button>
        </div>

        <div className="kudos-section">
          <h2>Kudos received</h2>
          {kudos.length === 0 ? (
            <p className="faded-text">No kudos received yet.</p>
          ) : (
            <ul className="kudos-list">
              {kudos.map((k) => (
                <li key={k.id} className="kudos-item">
                  <div className="kudos-badge">
                    {k.giver_name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <strong>{k.giver_name}</strong>
                    <p>{k.message}</p>
                    <p className="faded-text">
                      {new Date(k.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      <div className="logout-container">
        <button
          className="logout-button"
          onClick={() => {
            localStorage.clear(); // or remove specific token if used
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      </div>
    </div>
  );
}
