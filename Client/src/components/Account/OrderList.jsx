import React from 'react';
import DataTable from '../Admin/DataTable';
import { cancel } from '../../axios';
import './OrderList.css';

function OrderList() {

    const addLeadingZeros = (num) => {
        return num < 10 ? `0${num}` : num;
    };

    const renderOrderDetails = (data, cancelOrder) => {
        console.log("DATA ",data);
        return (
            <div className="product-details">
                {data.items.map((item, index) => (
                    <div key={index} className="product-info">
                        <p>Id: {data.orderId}</p>
                        <p>Name: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
                {data.status === "Processing" && <div className="cancel-button-container">
                     <button className="cancel-button" onClick={() => cancelOrder(data.orderId)}>Cancel</button>
                </div>}
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
        />
        </>
    );
}

export default OrderList;