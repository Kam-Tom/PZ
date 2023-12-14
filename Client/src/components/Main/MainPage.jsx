import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import LoginRegister from "../Account/LoginRegister";
import AdminPage from "../Admin/AdminPage";
import ProductTile from "./ProductTile";

function TileArray(array, size) {
    const tilesArray = [];
    for (let i = 0; i < array.length; i += size) {
        tilesArray.push(array.slice(i, i + size));
    }
    return tilesArray;
}

function MainPage() {
    const navigate = useNavigate();

    const products = Array(12).fill({
        name: 'iPhone 14 128GB 6.1"',
        price: "4 099 zł",
        stock: 7,
        image: "https://pngimg.com/d/iphone_14_PNG6.png",
    });

    const productRows = TileArray(products, 4);

    return (
        <Routes>

            <Route
                path="/"
                element={
                    <>
                        <Navbar />
                        <div className="product-list-container">
                            {productRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="product-list-row">
                                    {row.map((product, index) => (
                                        <ProductTile key={index} product={product} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                }
            />

            <Route
                path="/account"
                element={
                    <>
                        <LoginRegister />
                    </>
                }
            />

            <Route
                path="/admin"
                element={
                    <>
                        <AdminPage />
                    </>
                }
            />
        
            <Route
                path="/*"
                element={() => {
                    navigate("/", { replace: true });
                    return null;
                }}
            />
        
        </Routes>
    );
}

export default MainPage;
