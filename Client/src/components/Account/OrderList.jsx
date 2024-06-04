import React, { useEffect, useState } from 'react';
import DataTable from '../Admin/DataTable';
import { cancel, addToCart } from '../../axios';
import './OrderList.css';
import { Link } from 'react-router-dom';

function OrderList() {
    const [refresh, setRefresh] = useState(false);

    const addLeadingZeros = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    useEffect(() => {
        setRefresh(false);
    }, [refresh]);

    const addOrderToCart = async (data) => {
        try {
            for (const item of data.items) {
                for(let i = 0; i < item.quantity; i++) {
                    await addToCart(item.id)
                }
            }
            alert('Order added to cart');
            setRefresh(true);
        } catch (error) {
            console.error('Error adding order to cart', error);
            alert('Error adding order to cart');
        }
    }

    const renderOrderDetails = (data, cancelOrder) => {
        console.log("DATA ",data);
        return (
            <div className="product-details">
                {data.items.map((item, index) => (
                    <div key={index} className="product-info">
                        <p>Id: {item.id}</p>
                        <p>Name: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
                <div className="buttons-container">
                {data.status === "InBasket" ?
                <Link to={"/order"}><button className="re-add-to-cart-button">Go to basket</button></Link> :
                <button className="re-add-to-cart-button" onClick={() => addOrderToCart(data)}>Add order to cart</button>}
                {data.status === "Processing" && <button className="cancel-button" onClick={() => cancelOrder(data.orderId)}>Cancel</button>}
            </div>
            </div>
        );
    };

    return (
        <>
        <DataTable 
            apiGetEndpoint="https://localhost:7248/api/Shop/GetAll" 
            apiDeleteEndpoint="" 
            columns={[
                { header: 'OrderId', field: 'orderId', className: 'OrderId' },
                { header: 'Cost', field: 'cost', className: 'Cost' },
                { header: 'Status', field: 'status', className: 'Status' },
                { header: 'Date', field: 'date', className: 'Date', format: (date) => {
                    const d = new Date(date);
                    return `${d.getFullYear()}-${addLeadingZeros(d.getMonth() + 1)}-${addLeadingZeros(d.getDate())} ${addLeadingZeros(d.getHours())}:${addLeadingZeros(d.getMinutes())}:${addLeadingZeros(d.getSeconds())}`;
                }},
            ]}
            renderDetails={renderOrderDetails}
            refresh={refresh}
        />
        </>
    );
}

export default OrderList;