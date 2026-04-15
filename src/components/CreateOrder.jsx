import { useState } from "react";
import axios from "axios";

function CreateOrder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { garment: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      console.log({ customer_name: name, phone, items }); // debug

      const res = await axios.post("http://127.0.0.1:5000/create-order", {
        customer_name: name,
        phone,
        items
      });

      alert("Order Created! Total: ₹" + res.data.total);

      // reset form
      setName("");
      setPhone("");
      setItems([]);

    } catch (err) {
      console.error(err);
      alert("Error creating order");
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white">
      <h2 className="text-2xl mb-4">Create Order</h2>

      <input
        className="p-2 m-2 rounded bg-slate-700"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="p-2 m-2 rounded bg-slate-700"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />

      <button
        onClick={addItem}
        className="bg-green-500 px-4 py-2 rounded m-2"
      >
        Add Item
      </button>

      {items.map((item, index) => (
        <div key={index} className="m-2">
          <input
            placeholder="Garment"
            className="p-2 m-1 rounded bg-slate-700"
            onChange={(e) =>
              updateItem(index, "garment", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Qty"
            className="p-2 m-1 rounded bg-slate-700"
            onChange={(e) =>
              updateItem(index, "quantity", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="p-2 m-1 rounded bg-slate-700"
            onChange={(e) =>
              updateItem(index, "price", e.target.value)
            }
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-4 py-2 rounded m-2"
      >
        Submit Order
      </button>
    </div>
  );
}

export default CreateOrder;