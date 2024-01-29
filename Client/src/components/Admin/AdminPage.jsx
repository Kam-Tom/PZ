import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./AdminPage.css"
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import AddPromotionForm from "./AddPromotionForm";
import AddShippingMethodForm from "./AddShippingMethodForm";
import ProductList from "./ProductList";
import AdminMenu from "./AdminMenu";
import UserList from "./UserList";
import ReviewList from "./ReviewList";
import { getAll } from "../../axios";

function AdminPage({ onAddProduct }) {
    const [showList, setShowList] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showAddPromotionForm, setShowAddPromotionForm] = useState(false);
    const [showAddShippingMethodForm, setShowAddShippingMethodForm] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showReviewList, setShowReviewList] = useState(false);
    // const [products, setProducts] = useState(null);
    // const [users, setUsers] = useState(null);

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
        onAddProduct();
        setShowList(true);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setShowReviewList(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
    };

    const showAddProductFormFn = () => {
        setShowAddProductForm(true);
        setShowList(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setShowReviewList(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
    };

    const showAddCategoryFormFn = () => {
        setShowAddCategoryForm(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowUserList(false);
        setShowReviewList(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
    };

    const showAddPromotionFormFn = () => {
        setShowAddPromotionForm(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setShowReviewList(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
    };

    const showAddShippingMethodFormFn = () => {
        setShowAddShippingMethodForm(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setShowReviewList(false);
        setShowAddPromotionForm(false);
        setSelectedProduct(null);
    };

    const showUserListFn = async () => {
        // setUsers(await getAll("https://localhost:7248/api/Users/Get"));
        setShowUserList(true);
        setShowReviewList(false);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
    };

    const showReviewListFn = () => {
        setShowReviewList(true);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowUserList(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
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
                    // setProducts(await getAll("https://localhost:7248/Product/Admin"));
                    setShowList(true);
                    setShowAddProductForm(false);
                    setShowAddCategoryForm(false);
                    setShowUserList(false);
                    setShowAddPromotionForm(false);
                    setShowAddShippingMethodForm(false);
                    setSelectedProduct(null);
                }}
                onShowAddCategoryForm={showAddCategoryFormFn}
                onShowAddPromotionForm={showAddPromotionFormFn}
                onShowAddShippingMethodForm={showAddShippingMethodFormFn}
                onShowUserList={showUserListFn}
                onShowReviewList={showReviewListFn}
            />
            {showAddProductForm && <AddProductForm onAddProduct={handleAddProduct} />}
            {showAddCategoryForm && <AddCategoryForm onAddCategory={handleAddCategory} onClose={handleCloseAddCategoryForm} />}
            {showAddPromotionForm && <AddPromotionForm onAddPromotion={handleAddPromotion} onClose={handleCloseAddPromotionForm} />}
            {showAddShippingMethodForm && <AddShippingMethodForm onAddShippingMethod={handleAddShippingMethod} onClose={handleCloseAddShippingMethodForm} />}
            {showList && (
                <ProductList
                    // products={products}
                    onSelectProduct={(product) => setSelectedProduct(product)}
                    // selectedProduct={selectedProduct}
                />
            )}
            {showUserList && <UserList 
                //users={users} 
            />}
            {showReviewList && <ReviewList />}
        </div>
    );
}

AdminPage.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
};

export default AdminPage;