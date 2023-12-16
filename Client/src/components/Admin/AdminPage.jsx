import React, { useState } from "react";
import "./AdminPage.css"
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import ProductList from "./ProductList";
import AdminMenu from "./AdminMenu";
import UserList from "./UserList";
import { getAll } from "../../axios";

function AdminPage() {
    const [showList, setShowList] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [users, setUsers] = useState(null);

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

    const showUserListFn = async () => {
        setUsers(await getAll("https://localhost:7248/api/Users/Get"));
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
                    setProducts(await getAll("https://localhost:7248/Product/Admin"));
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