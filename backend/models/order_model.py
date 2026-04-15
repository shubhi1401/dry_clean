from config.db import get_db

def create_order(data):
    db = get_db()
    cursor = db.cursor()

    query = "INSERT INTO orders (customer_name, phone, total_amount) VALUES (%s, %s, %s)"
    cursor.execute(query, (data['name'], data['phone'], data['total']))

    db.commit()
    return cursor.lastrowid