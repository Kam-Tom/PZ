import React, { useState } from "react";
import "./AdminPage.css"
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import AddPromotionForm from "./AddPromotionForm";
import AddShippingMethodForm from "./AddShippingMethodForm";
import ProductList from "./ProductList";
import AdminMenu from "./AdminMenu";
import UserList from "./UserList";
import { getAll } from "../../axios";

function AdminPage() {
    const [showList, setShowList] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showAddPromotionForm, setShowAddPromotionForm] = useState(false);
    const [showAddShippingMethodForm, setShowAddShippingMethodForm] = useState(false);
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

    const handleAddPromotion = (newPromotionData) => {
        setShowAddPromotionForm(false);
    };

    const handleAddShippingMethod = (newShippingMethodData) => {
        setShowAddShippingMethodForm(false);
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

    const showAddPromotionFormFn = () => {
        setShowAddPromotionForm(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setSelectedProduct(null);
    };

    const showAddShippingMethodFormFn = () => {
        setShowAddShippingMethodForm(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
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

    const handleCloseAddPromotionForm = () => {
        setShowAddPromotionForm(false);
    };

    const handleCloseAddShippingMethodForm = () => {
        setShowAddShippingMethodForm(false);
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
                onShowAddPromotionForm={showAddPromotionFormFn}
                onShowAddShippingMethodForm={showAddShippingMethodFormFn}
                onShowUserList={showUserListFn}
            />
            {showAddProductForm && <AddProductForm onAddProduct={handleAddProduct} />}
            {showAddCategoryForm && <AddCategoryForm onAddCategory={handleAddCategory} onClose={handleCloseAddCategoryForm} />}
            {showAddPromotionForm && <AddPromotionForm onAddPromotion={handleAddPromotion} onClose={handleCloseAddPromotionForm} />}
            {showAddShippingMethodForm && <AddShippingMethodForm onAddShippingMethod={handleAddShippingMethod} onClose={handleCloseAddShippingMethodForm} />}
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