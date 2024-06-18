import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./AdminPage.css";
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import AddPromotionForm from "./AddPromotionForm";
import AddShippingMethodForm from "./AddShippingMethodForm";
import ProductList from "./ProductList";
import AdminMenu from "./AdminMenu";
import UserList from "./UserList";
import ReviewList from "./ReviewList";
import OrderList from "./OrderList";
import StatsAdmin from "./StatsAdmin";
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
    const [showOrderList, setShowOrderList] = useState(false);
    const [showStats, setShowStats] = useState(true);
    // const [products, setProducts] = useState(null);
    // const [users, setUsers] = useState(null);

    const handleAddProduct = (newProductData) => {
        setShowAddProductForm(false);
        setSelectedProduct(newProductData);
    };

    const handleAddCategory = (newCategoryData) => {
        setShowAddCategoryForm(false);
    };

    const handleAddCategorySuccess = () => {
        setShowStats(true);
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
        setShowOrderList(false);
        setShowStats(false);
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
        setShowOrderList(false);
        setShowStats(false);
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
        setShowOrderList(false);
        setShowStats(false);
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
        setShowOrderList(false);
        setShowStats(false);
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
        setShowOrderList(false);
        setShowStats(false);
    };

    const showUserListFn = () => {
        // setUsers(await getAll("https://localhost:7248/api/Users/Get"));
        setShowUserList(true);
        setShowReviewList(false);
        setShowList(false);
        setShowAddProductForm(false);
        setShowAddCategoryForm(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
        setShowOrderList(false);
        setShowStats(false);
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
        setShowOrderList(false);
        setShowStats(false);
    };
    const showOrderListFn = () => {
        setShowAddCategoryForm(false);
        setShowList(false);
        setShowAddProductForm(false);
        setShowUserList(false);
        setShowReviewList(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
        setShowOrderList(true);
        setShowStats(false);
    };

    const showStatsfn = () => {
        setShowAddCategoryForm(false);
        setShowList(false);
        setShowAddProductForm(false);
        setShowUserList(false);
        setShowReviewList(false);
        setShowAddPromotionForm(false);
        setShowAddShippingMethodForm(false);
        setSelectedProduct(null);
        setShowOrderList(false);
        setShowStats(true);
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
                    setShowOrderList(false);
                    setShowReviewList(false);
                    setShowStats(false);
                }}
                onShowAddCategoryForm={showAddCategoryFormFn}
                onShowAddPromotionForm={showAddPromotionFormFn}
                onShowAddShippingMethodForm={showAddShippingMethodFormFn}
                onShowUserList={showUserListFn}
                onShowReviewList={showReviewListFn}
                onShowOrderList={showOrderListFn}
                onShowStats={showStatsfn}
            />
            {showAddProductForm && <AddProductForm onAddProduct={handleAddProduct} />}
            {showAddCategoryForm && <AddCategoryForm onAddCategory={handleAddCategory} onClose={handleCloseAddCategoryForm} onAddCategorySuccess={handleAddCategorySuccess} />}
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
            {showOrderList && <OrderList />}
            {showStats && <StatsAdmin />}
        </div>
    );
}

AdminPage.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
};

export default AdminPage;