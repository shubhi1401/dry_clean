import { useEffect, useState } from "react";
import axios from "axios";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchOrders = () => {
    axios.get("http://127.0.0.1:5000/orders", {
      params: {
        status: statusFilter,
        search: search
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (id, newStatus) => {
    axios.put(`http://127.0.0.1:5000/update-status/${id}`, {
      status: newStatus
    }).then(() => fetchOrders());
  };

  return (
    <div className="p-6 bg-slate-900 text-white">
      <h2 className="text-2xl mb-4">Orders</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          className="p-2 rounded bg-slate-700"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 rounded bg-slate-700"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="RECEIVED">RECEIVED</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="READY">READY</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>

        <button
          onClick={fetchOrders}
          className="bg-blue-500 px-4 rounded"
        >
          Apply
        </button>
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <p className="text-gray-400">No orders found</p>
      )}

      {/* Orders */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-slate-800 p-4 mb-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <p><b>Name:</b> {order.customer_name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Total:</b> ₹{order.total_amount}</p>

          <p>
            <b>Status:</b>
            <span className="ml-2 px-2 py-1 rounded bg-gray-600">
              {order.status}
            </span>
          </p>

          <p>
            <b>Delivery:</b>{" "}
            {order.delivery_date
              ? new Date(order.delivery_date).toLocaleDateString()
              : "N/A"}
          </p>

          <select
            className="mt-2 p-2 bg-slate-700 rounded"
            onChange={(e) => updateStatus(order.id, e.target.value)}
          >
            <option>Update Status</option>
            <option value="RECEIVED">RECEIVED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="READY">READY</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default OrderList;