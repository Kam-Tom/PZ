import React, { useState } from "react";
import "./AdminPage.css"
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import ProductList from "./ProductList";
import AdminMenu from "./AdminMenu";
import UserList from "./UserList";
import { getProducts } from "../../axios";

function AdminPage() {
    const [showList, setShowList] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState(null);

    

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
                onShowProductList={async () => {
                    //setProducts(getProducts());
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
            {showList && products && (
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