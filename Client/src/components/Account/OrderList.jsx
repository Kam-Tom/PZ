import React from 'react';
import DataTable from '../Admin/DataTable';
import './OrderList.css';

function OrderList() {

    const renderOrderDetails = (data, onDelete) => {
        return (
            <div className="product-details">
                {data.items.map((item, index) => (
                    <div key={index} className="product-info">
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
                {data.status === "Processing" && <div className="cancel-button-container">
                     <button className="cancel-button" onClick={() => onDelete(data.id)}>Cancel</button>
                </div>}
            </div>
        );
    };

    return (
        <>
        <DataTable 
            apiGetEndpoint="https://localhost:7248/api/Shop/GetAll" 
            apiDeleteEndpoint="https://localhost:7248/Product/" 
            columns={[
                { header: 'OrderId', field: 'orderId', className: 'OrderId' },
                { header: 'Cost', field: 'cost', className: 'Cost' },
                { header: 'Status', field: 'status', className: 'Status' },
                { header: 'Date', field: 'date', className: 'Date' }
            ]}
            renderDetails={renderOrderDetails}
        />
        </>
    );
}

export default OrderList;