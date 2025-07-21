// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";

// // export default function Login() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     try {
// //       const response = await api.post("token/", { username, password });
// //       localStorage.setItem("token", response.data.access);
// //       navigate("/dashboard");
// //     } catch  {
// //       setError("Invalid credentials");
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
// //       <h2 className="text-xl font-bold mb-4">Login</h2>
// //       <form onSubmit={handleLogin} className="space-y-4">
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           className="w-full border px-3 py-2 rounded"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           className="w-full border px-3 py-2 rounded"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         {error && <p className="text-red-500 text-sm">{error}</p>}
// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-4 py-2 rounded w-full"
// //         >
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await api.post("token/", { username: email, password });
//       localStorage.setItem("token", response.data.access);
//       navigate("/dashboard");
//     } catch {
//       setError("Invalid credentials.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
//         <h1 className="text-3xl font-bold text-white">Log in</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1">Email</label>
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none"
//             />
//           </div>
//           {error && <p className="text-red-400 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
//           >
//             Log in
//           </button>
//         </form>
//         <p className="text-sm text-gray-400 text-center">
//           Don't have an account?
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("token/", { username: email, password });
      localStorage.setItem("token", response.data.access);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Log in</h1>
        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="samiya@company.com"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="••••••••"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        <p className="login-footer">Don't have an account?</p>
      </div>
    </div>
  );
}
