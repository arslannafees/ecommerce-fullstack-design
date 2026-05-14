import { useState, useEffect } from 'react';
import { fetchOrders } from '../api/products';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const loadOrders = async () => {
        try {
          const data = await fetchOrders();
          setOrders(data.sort((a, b) => b.timestamp - a.timestamp));
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (!currentUser) return <div className="container" style={{padding:'4rem 0', textAlign:'center'}}><h2>Please login to view your orders.</h2></div>;
  if (loading) return <div className="container" style={{padding:'4rem 0', textAlign:'center'}}><p>Loading orders...</p></div>;

  return (
    <div className="orders-page container">
      <h1 className="orders-page__title">My Orders</h1>
      {orders.length === 0 ? (
        <div className="orders-page__empty">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-page__list">
          {orders.map((order, idx) => (
            <div key={idx} className="order-card">
              <div className="order-card__header">
                <div>
                  <p className="order-card__date">Date: {new Date(order.timestamp).toLocaleDateString()}</p>
                  <p className="order-card__id">Order Ref: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div className="order-card__status-badge">{order.status}</div>
              </div>
              <div className="order-card__items">
                {order.items.map((item, iIdx) => (
                  <div key={iIdx} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item__img" />
                    <div className="order-item__info">
                      <p className="order-item__name">{item.name}</p>
                      <p className="order-item__qty">Qty: {item.quantity} x ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-card__footer">
                <p className="order-card__total">Total: <span>${order.totalAmount.toFixed(2)}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
