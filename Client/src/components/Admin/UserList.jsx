import DataTable from './DataTable';
import './DataTable.css';

function UserList() {
    const renderUserDetails = (data, onDelete) => (
        <div className="user-details">
            <div className="user-info">
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
            </div>
            <div>
                <button onClick={() => onDelete(data.id)}>Delete</button>
            </div>
        </div>
    );

    return (
        <DataTable 
            apiGetEndpoint="https://localhost:7248/api/Users/Get"
            apiDeleteEndpoint="https://localhost:7248/api/Users?userId=" 
            columns={[
                { header: 'Name', field: 'username', className: '' },
                { header: 'Email', field: 'email', className: 'Email' }
            ]}
            renderDetails={renderUserDetails}
        />
    );
}

export default UserList;