import React from "react";

function Navbar({ setPage, handleLogout }) {
  return (
    <div className="flex justify-between items-center bg-slate-800 p-4 text-white">
      <h1 className="text-xl font-bold">DryClean System</h1>

      <div className="flex gap-4">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("orders")}>Orders</button>
        <button onClick={() => setPage("create")}>Create Order</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;