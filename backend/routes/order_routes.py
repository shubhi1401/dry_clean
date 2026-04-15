from flask import Blueprint, request, jsonify
from services.order_service import calculate_total
from models.order_model import create_order

order_bp = Blueprint('order', __name__)

@order_bp.route('/create-order', methods=['POST'])
def create():
    data = request.json

    total = calculate_total(data['items'])
    order_id = create_order({
        "name": data['customer_name'],
        "phone": data['phone'],
        "total": total
    })

    return jsonify({"order_id": order_id, "total": total})