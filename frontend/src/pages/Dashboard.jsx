// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";

// // export default function Dashboard() {
// //   const [user, setUser] = useState(null);
// //   const [kudos, setKudos] = useState([]);
// //   const [quota, setQuota] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [userRes, kudosRes, quotaRes] = await Promise.all([
// //           api.get("me/"),
// //           api.get("kudos/received/"),
// //           api.get("kudos/quota/"),
// //         ]);
// //         setUser(userRes.data);
// //         setKudos(kudosRes.data);
// //         setQuota(quotaRes.data.remaining_kudos);
// //       } catch (err) {
// //         console.error("Error loading dashboard:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) return <div className="p-6">Loading...</div>;

// //   return (
// //     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
// //       <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>
// //       <p>
// //         Organization: <strong>{user.organization.name}</strong>
// //       </p>
// //       <p>
// //         Kudos Remaining: <strong>{quota}</strong>
// //       </p>

// //       <button
// //         onClick={() => navigate("/give")}
// //         className="bg-green-600 text-white px-4 py-2 rounded"
// //         disabled={quota === 0}
// //       >
// //         Give Kudos
// //       </button>

// //       <div className="mt-6">
// //         <h2 className="text-xl font-semibold mb-2">Received Kudos</h2>
// //         {kudos.length === 0 ? (
// //           <p>No kudos received yet.</p>
// //         ) : (
// //           <ul className="space-y-2">
// //             {kudos.map((k) => (
// //               <li key={k.id} className="border p-3 rounded">
// //                 <strong>From:</strong> {k.giver.username}
// //                 <br />
// //                 <strong>Message:</strong> {k.message}
// //                 <br />
// //                 <small>{new Date(k.created_at).toLocaleString()}</small>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { formatDistanceToNow } from "date-fns";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [kudos, setKudos] = useState([]);
//   const [quota, setQuota] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const [userRes, kudosRes, quotaRes] = await Promise.all([
//         api.get("me/"),
//         api.get("kudos/received/"),
//         api.get("kudos/quota/"),
//       ]);
//       setUser(userRes.data);
//       setKudos(kudosRes.data);
//       setQuota(quotaRes.data.remaining_kudos);
//     };
//     fetchData();
//   }, []);

//   if (!user) return <div className="p-6 text-white">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
//       <div className="w-full max-w-2xl space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">Hello, {user.username}</h1>
//             <p className="text-sm text-gray-400">{user.organization.name}</p>
//             <p className="text-sm mt-1">Kudos remaining: {quota}</p>
//           </div>
//           <button
//             onClick={() => navigate("/give")}
//             className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold ${
//               quota === 0 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={quota === 0}
//           >
//             Give Kudos
//           </button>
//         </div>

//         <div>
//           <h2 className="text-lg font-semibold mb-2">Kudos received</h2>
//           {kudos.length === 0 ? (
//             <p className="text-gray-400">No kudos received yet.</p>
//           ) : (
//             <ul className="space-y-4">
//               {kudos.map((k) => (
//                 <li key={k.id} className="bg-gray-800 p-4 rounded shadow">
//                   <p className="font-bold">{k.giver_name}</p>
//                   <p className="text-sm">{k.message}</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {formatDistanceToNow(new Date(k.created_at))} ago
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


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
      </div>
    </div>
  );
}
