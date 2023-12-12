import React, { useState } from "react";
import "./AdminPage.css"
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import ProductList from "./ProductList";
import AdminMenu from "./AdminMenu";
import UserList from "./UserList";

function AdminPage() {
    const [showList, setShowList] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        {
            productName: "Laptop",
            category: "Electronics",
            image: "url_do_obrazka",
            price: 999,
            description: "Powerful laptop for all your needs.",
            quantity: 10,
        },
        {
            productName: "Smartphone",
            category: "Electronics",
            image: "url_do_obrazka",
            price: 499,
            description: "The latest smartphone with amazing features.",
            quantity: 20,
        },
        {
            productName: "Desk Chair",
            category: "Furniture",
            image: "url_do_obrazka",
            price: 129,
            description: "Comfortable chair for long hours of work.",
            quantity: 5,
        },
    ];

    const users = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            address: "123 Main St, City",
            phoneNumber: "123-456-7890",
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            address: "456 Oak St, Town",
            phoneNumber: "987-654-3210",
        },
    ];

    const handleAddProduct = (newProductData) => {
        setShowAddProductForm(false);
        setSelectedProduct(newProductData);
    };

    const handleAddCategory = (newCategoryData) => {
        setShowAddCategoryForm(false);
    };

    const showProducts = () => {
        setShowList(true);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setSelectedProduct(null);
    };

    const showAddProductFormFn = () => {
        setShowAddProductForm(true);
        setShowList(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setSelectedProduct(null);
    };

    const showAddCategoryFormFn = () => {
        setShowAddCategoryForm(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowUserList(false);
        setSelectedProduct(null);
    };

    const showUserListFn = () => {
        setShowUserList(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setSelectedProduct(null);
    };

    const handleCloseAddCategoryForm = () => {
        setShowAddCategoryForm(false);
    };

    return (
        <div className="admincontainer">
            <AdminMenu
                onShowProducts={showProducts}
                onShowAddProductForm={showAddProductFormFn}
                onShowProductList={() => {
                    setShowList(true);
                    setShowAddProductForm(false);
                    setShowAddCategoryForm(false);
                    setShowUserList(false);
                    setSelectedProduct(null);
                }}
                onShowAddCategoryForm={showAddCategoryFormFn}
                onShowUserList={showUserListFn}
            />
            {showAddProductForm && <AddProductForm onAddProduct={handleAddProduct} />}
            {showAddCategoryForm && <AddCategoryForm onAddCategory={handleAddCategory} onClose={handleCloseAddCategoryForm} />}
            {showList && (
                <ProductList
                    products={products}
                    onSelectProduct={(product) => setSelectedProduct(product)}
                    selectedProduct={selectedProduct}
                />
            )}
            {showUserList && <UserList users={users} />}
        </div>
    );
}

export default AdminPage;