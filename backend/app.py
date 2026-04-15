from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime, timedelta
app = Flask(__name__)
CORS(app)

# 🔹 DB connection
db = mysql.connector.connect(
    host="localhost",
    user="testuser",
    password="1234",
    database="dryclean"
)

cursor = db.cursor(dictionary=True)

# 🔹 Home route
@app.route('/')
def home():
    return "Backend running 🚀"


# 🔹 Create Order
@app.route('/create-order', methods=['POST'])
def create_order():
    data = request.get_json(force=True)
    name = data.get('customer_name')
    phone = data.get('phone')
    items = data.get('items') or []
    print("DATA:", data)
    total = 0
    for item in items:
        qty = int(item.get('quantity', 0))
        price = float(item.get('price', 0))
        total += qty * price
    delivery_date = datetime.now() + timedelta(days=2)
    cursor.execute(
        "INSERT INTO orders (customer_name, phone, total_amount, delivery_date) VALUES (%s, %s, %s, %s)",
        (name, phone, total, delivery_date)
    )
    db.commit()
    order_id = cursor.lastrowid
    for item in items:
        cursor.execute(
            "INSERT INTO order_items (order_id, garment, quantity, price) VALUES (%s, %s, %s, %s)",
            (
                order_id,
                item.get('garment', ''),
                int(item.get('quantity', 0)),
                float(item.get('price', 0))
            )
        )
    db.commit()
    return jsonify({
        "message": "Order saved",
        "total": total,
        "delivery_date": str(delivery_date)
    })
# 🔹 Get Orders
@app.route('/orders', methods=['GET'])
def get_orders():
    status = request.args.get('status')
    phone = request.args.get('phone')
    search = request.args.get('search')

    query = "SELECT * FROM orders WHERE 1=1"
    params = []

    if status:
        query += " AND status=%s"
        params.append(status)

    if phone:
        query += " AND phone=%s"
        params.append(phone)

    if search:
        query += " AND (customer_name LIKE %s OR phone LIKE %s)"
        params.extend([f"%{search}%", f"%{search}%"])

    cursor.execute(query, params)
    orders = cursor.fetchall()

    return jsonify(orders)
# 🔹 Dashboard
@app.route('/dashboard', methods=['GET'])
def dashboard():
    cursor.execute("SELECT COUNT(*) as total_orders FROM orders")
    total_orders = cursor.fetchone()['total_orders']

    cursor.execute("SELECT SUM(total_amount) as revenue FROM orders")
    revenue = cursor.fetchone()['revenue']

    cursor.execute("SELECT status, COUNT(*) as count FROM orders GROUP BY status")
    status_data = cursor.fetchall()

    return jsonify({
        "total_orders": total_orders,
        "revenue": revenue,
        "status_data": status_data
    })


# 🔹 Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True)

    username = str(data.get('username')).strip()
    password = str(data.get('password')).strip()

    cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
    user = cursor.fetchone()

    if user and str(user['password']).strip() == password:
        return jsonify({"message": "Login successful"})

    return jsonify({"message": "Invalid credentials"}), 401


# 🔹 Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)