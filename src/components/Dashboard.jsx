import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/dashboard")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800 p-4 rounded-xl shadow">
          <p>Total Orders</p>
          <h2 className="text-xl font-bold">
            {data.total_orders || 0}
          </h2>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl shadow">
          <p>Revenue</p>
          <h2 className="text-xl font-bold">
            ₹{data.revenue || 0}
          </h2>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl shadow">
          <p>Status Count</p>
          {data.status_data?.map((s, i) => (
            <p key={i}>
              {s.status}: {s.count}
            </p>
          ))}
        </div>
      </div>

      {/* 🔥 CHART (ADD HERE BELOW STATS) */}
      <div className="bg-slate-800 p-6 rounded-xl shadow">
        <h2 className="text-xl mb-4">Orders by Status</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.status_data || []}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;