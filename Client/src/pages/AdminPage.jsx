import React, { useState } from "react";
import "../css/AdminPage.css"
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import ProductList from "./ProductList";
import AdminMenu from "./AdminMenu";
import { useEffect } from "react";

function AdminPage() {
    const [showList, setShowList] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [produkty, setProdukty] = useState(null);

    //useEffect(() => {
    //    fetch("https://localhost:44366/product")
    //        .then(res => res.json()
    //            .then((data) => {
    //                setProdukty(data);
    //                console.log("produkty get");
    //        }))
    //}, []);

    const products = async () => {
        await fetch("https://localhost:7248/products")
            .then(response => response.json())
            .then(response => {
                setProdukty(response)
                console.log("produkty get");
            });
    }

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
        setSelectedProduct(null);
    };

    const showAddProductFormFn = () => {
        setShowAddProductForm(true);
        setShowList(false);
        setShowAddCategoryForm(false);
        setSelectedProduct(null);
    };

    const showAddCategoryFormFn = () => {
        setShowAddCategoryForm(true);
        setShowList(false);
        setShowAddProductForm(false);
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
                    await products();
                    setShowList(true);
                    setShowAddProductForm(false);
                    setShowAddCategoryForm(false);
                    setSelectedProduct(null);
                }}
                onShowAddCategoryForm={showAddCategoryFormFn}
            />
            {showAddProductForm && <AddProductForm onAddProduct={handleAddProduct} />}
            {showAddCategoryForm && <AddCategoryForm onAddCategory={handleAddCategory} onClose={handleCloseAddCategoryForm} />}
            {showList && produkty && (
                <ProductList
                    products={produkty}
                    onSelectProduct={(product) => setSelectedProduct(product)}
                    selectedProduct={selectedProduct}
                />
            )}
        </div>
    );
}

export default AdminPage;