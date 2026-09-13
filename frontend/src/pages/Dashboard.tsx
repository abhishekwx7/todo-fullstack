import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="mt-4 text-gray-600">Welcome, {user?.email}</p>

        <p className="text-gray-500">{user?.email}</p>

        <button
          onClick={logout}
          className="mt-6 rounded bg-black px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
