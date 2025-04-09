import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const API_URL = "http://localhost:4000/api/items";

function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) return;
    try {
      await axios.post(API_URL, { item: newItem });
      setNewItem("");
      fetchItems();
    } catch (err) {
      console.error("Lỗi khi thêm item:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="home-container">
      <h2>🌟 Quản lý Item</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Nhập item mới..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>➕ Thêm</button>
      </div>

      <ul className="item-list">
        {items.length === 0 ? (
          <li className="empty">Chưa có item nào</li>
        ) : (
          items.map((item, index) => (
            <li key={index} className="item">
              {item}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
