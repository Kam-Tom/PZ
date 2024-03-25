import React, { useState } from "react";
import DataTable from './DataTable';
import './DataTable.css';
import { getAll, updateOrderStatus } from '../../axios'
import { useEffect } from "react";
function OrderList() {
    const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger DataTable update

    const renderOrderDetails = (data) => {
        return <Order orderId={data.orderId} onUpdate={handleUpdate} />
    };

    const handleUpdate = () => {
        setUpdateTrigger(prevState => !prevState); // Toggle updateTrigger state to trigger re-render
    };



    return (
    
        <DataTable
            key={updateTrigger} // Key prop to trigger re-render of DataTable
            apiGetEndpoint="https://localhost:7248/api/Shop/GetAllAsAdmin"
            columns={[
                { header: '#Id', field: 'orderId', className: 'orderId' },
                { header: 'Date', field: 'date', className: 'Date' },
                { header: 'Status', field: 'status', className: 'Status' }
            ]}
            renderDetails={renderOrderDetails}
        />
    );
}

function Order({ orderId, onUpdate }) {
    const [details, setDetails] = useState(null);
    const categories = [
        'InBasket',
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Canceled'];
    async function fetch() {
        let data = await getAll(`https://localhost:7248/api/Shop/GetDetails?id=${orderId}`);

        setDetails(data);

    }
    async function handleStatusChange(e) {
        setDetails((prevData) => ({ ...prevData, ['status']: e.target.value }));
        let statusId = categories.indexOf(e.target.value);
        await updateOrderStatus(orderId, statusId);
        onUpdate();
    }
    useEffect(() => {
        fetch();
    }, []);
    return (
        <div>
            <div>
                <p>Id:{details?.orderId}</p>
                <p>Username:{details?.username}</p>
                <p>{"Date"}:{details?.date}</p>
                <p>Status:
                    <select name="category" value={details?.status} onChange={handleStatusChange}>
                        <option value={details?.status} disabled>{details?.status}</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </p>
            </div>

        </div>
    );
}

export default OrderList;