import { useState } from "react";
import Login from ".\pages\Login";
import Dashboard from ".\components\Dashboard";
import OrderList from ".\components\OrderList";
import CreateOrder from ".\components\CreateOrder";
import Navbar from ".\components\Navbar";
import Sidebar from ".\components\Sidebar";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [page, setPage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">
    <Sidebar setPage={setPage} handleLogout={handleLogout} />

    <div className="flex-1 p-6">
      {page === "dashboard" && <Dashboard />}
      {page === "orders" && <OrderList />}
      {page === "create" && <CreateOrder />}
    </div>
  </div>
  );
}

export default App;
