function Sidebar({ setPage, handleLogout }) {
  return (
    <div className="w-64 h-screen bg-slate-800 text-white p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">DryClean</h1>

      <button
        onClick={() => setPage("dashboard")}
        className="mb-4 text-left hover:text-blue-400"
      >
        Dashboard
      </button>

      <button
        onClick={() => setPage("orders")}
        className="mb-4 text-left hover:text-blue-400"
      >
        Orders
      </button>

      <button
        onClick={() => setPage("create")}
        className="mb-4 text-left hover:text-blue-400"
      >
        Create Order
      </button>

      <button
        onClick={handleLogout}
        className="mt-auto text-red-400 hover:text-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;