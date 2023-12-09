import React from "react";
import "../css/AdminPage.css"


function AdminPage() {

    const Orders = [
        {
            productName: 'JavaScript Tutorial',
            productNumber: '85743',
            paymentStatus: 'Due',
            status: 'Pending'
        },
        {
            productName: 'CSS Full Course',
            productNumber: '97245',
            paymentStatus: 'Refunded',
            status: 'Declined'
        },
        {
            productName: 'Flex-Box Tutorial',
            productNumber: '36452',
            paymentStatus: 'Paid',
            status: 'Active'
        },
    ]
    
    let showList = false;


    function showUsers() {
        const usersButton = document.getElementById('users');
        const usersList = document.getElementById('list');


        if(!showList){
            const thead = document.createElement('thead');
                    const content = `
                        <td>ID</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Shipping Address</td>
                    `;
                    thead.innerHTML = content;
                    usersList.append(thead);
            for(let order of Orders){
            const tr = document.createElement('tr');
                    const trContent = `
                        <td>${order.productNumber}</td>
                        <td>${order.productName}</td>
                        <td>${order.paymentStatus}</td>
                        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
                    `;
                    tr.innerHTML = trContent;
                    usersList.append(tr);
                    let btnConstraints = document.createElement('td')
                    btnConstraints.classList.add("clickable")
                    btnConstraints.innerText = 'Constraints'
                    tr.append(" ", btnConstraints)
                    // dodawanie ograniczeń:
                    btnConstraints.onclick = () => {
                        tr.remove()
                    }
                    let btnBan = document.createElement('td')
                    btnBan.classList.add("clickable")
                    btnBan.innerText = 'Ban'
                    tr.append(" ", btnBan)
                    // wykluczanie:
                    btnBan.onclick = () => {
                        tr.remove()
                    }
                    let btnSend = document.createElement('td')
                    btnSend.classList.add("clickable")
                    btnSend.innerText = 'Send an Email'
                    tr.append(" ", btnSend)
                    // wysyłanie maila:
                    btnSend.onclick = () => {
                        tr.remove()
                    }
            }
            showList = true;
        }
      };
    return (       
        <div className="admincontainer">
            
            <div className="adminsidebar">
                <p id="users" onClick={showUsers}>
                    <span>Users</span>
                </p>
                <p>
                    <span>Products</span>
                </p>
                <p>
                    <span>Comments</span>
                </p>
            </div>
                <table className="adminlist" id="list"> 
                </table>
        </div>
    );
}

export default AdminPage;