// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";

// // export default function GiveKudos() {
// //   const [users, setUsers] = useState([]);
// //   const [receiver, setReceiver] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [quota, setQuota] = useState(0);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchUsersAndQuota = async () => {
// //       try {
// //         const [usersRes, quotaRes] = await Promise.all([
// //           api.get("users/available/"),
// //           api.get("kudos/quota/"),
// //         ]);
// //         setUsers(usersRes.data);
// //         setQuota(quotaRes.data.remaining_kudos);
// //       } catch (err) {
// //         setError("Error loading users or quota.");
// //         console.error(err);
// //       }
// //     };
// //     fetchUsersAndQuota();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       await api.post("kudos/give/", {
// //         receiver_id: receiver, // ✅ Fixed key name
// //         message,
// //       });
// //       navigate("/dashboard");
// //     } catch (err) {
// //       console.error(err);
// //       // Handle error response more gracefully
// //       const data = err.response?.data;
// //       if (data?.receiver_id) {
// //         setError(`Receiver Error: ${data.receiver_id.join(", ")}`);
// //       } else if (data?.detail) {
// //         setError(data.detail);
// //       } else {
// //         setError("Something went wrong.");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
// //       <h1 className="text-xl font-bold mb-4">Give Kudos</h1>
// //       {quota === 0 ? (
// //         <p className="text-red-500 font-medium">
// //           You have no kudos left this week.
// //         </p>
// //       ) : (
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <select
// //             value={receiver}
// //             onChange={(e) => setReceiver(e.target.value)}
// //             required
// //             className="w-full border px-3 py-2 rounded"
// //           >
// //             <option value="">Select a teammate</option>
// //             {users.map((user) => (
// //               <option key={user.id} value={user.id}>
// //                 {user.username} ({user.email})
// //               </option>
// //             ))}
// //           </select>

// //           <textarea
// //             placeholder="Why are you giving kudos?"
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //             required
// //             className="w-full border px-3 py-2 rounded"
// //           />

// //           {error && <p className="text-red-500 text-sm">{error}</p>}

// //           <button
// //             type="submit"
// //             className="bg-blue-600 text-white px-4 py-2 rounded w-full"
// //             disabled={quota === 0}
// //           >
// //             Send Kudos
// //           </button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function GiveKudos() {
//   const [users, setUsers] = useState([]);
//   const [receiver, setReceiver] = useState("");
//   const [message, setMessage] = useState("");
//   const [quota, setQuota] = useState(0);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetch = async () => {
//       const [userRes, quotaRes] = await Promise.all([
//         api.get("users/available/"),
//         api.get("kudos/quota/"),
//       ]);
//       setUsers(userRes.data);
//       setQuota(quotaRes.data.remaining_kudos);
//     };
//     fetch();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await api.post("kudos/give/", { receiver_id: receiver, message });
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.detail || "Failed to give kudos.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-6 rounded-lg shadow w-full max-w-md space-y-4"
//       >
//         <h1 className="text-xl font-bold">Give Kudos</h1>

//         {quota === 0 ? (
//           <p className="text-red-500">You have no kudos left this week.</p>
//         ) : (
//           <>
//             <div>
//               <label className="block mb-1">Choose a teammate</label>
//               <select
//                 value={receiver}
//                 onChange={(e) => setReceiver(e.target.value)}
//                 className="w-full p-2 bg-gray-700 rounded"
//               >
//                 <option value="">-- Select --</option>
//                 {users.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.username}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1">Message</label>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 rows={3}
//                 className="w-full p-2 bg-gray-700 rounded"
//               />
//             </div>
//             {error && <p className="text-red-400 text-sm">{error}</p>}
//             <button
//               type="submit"
//               disabled={!receiver || !message || quota === 0}
//               className={`w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold ${
//                 quota === 0 ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               Send Kudos
//             </button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// }


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
