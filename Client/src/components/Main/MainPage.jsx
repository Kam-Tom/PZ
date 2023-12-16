import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import LoginRegister from "../Account/LoginRegister";
import AdminPage from "../Admin/AdminPage";
import ProductTile from "../Product/ProductTile";
import ProductPage from "../Product/ProductPage";
import ProductFilter from "../Product/ProductFilter";
import { getAll, addToCart } from "../../axios";

function TileArray(array, size) {
    const tilesArray = [];
    for (let i = 0; i < array.length; i += size) {
        tilesArray.push(array.slice(i, i + size));
    }
    return tilesArray;
}

function MainPage() {
    const navigate = useNavigate();
    const [filteredCategory, setFilteredCategory] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetch() {
        setProducts(await getAll("https://localhost:7248/Product"));
        }
        fetch();
    }, []);

    // const products = [
    //     {
    //         id: 0,
    //         name: 'iPhone 14 128GB 6.1"',
    //         price: "4 099 zł",
    //         stock: 7,
    //         image: "https://pngimg.com/d/iphone_14_PNG6.png",
    //         description: "Smartfon Apple 128 GB z ekranem 6,1 cala, wyświetlacz OLED. Aparat 12 Mpix, pamięć 6 GB RAM, bateria 3279mAh. Obsługuje sieć: 5G",
    //         category: "Phone",
    //     },
    //     {
    //         id: 1,
    //         name: 'Samsung Galaxy S22 Ultra',
    //         price: "4 499 zł",
    //         stock: 5,
    //         image: "https://static.api.plenti.app/file/product/2808",
    //         description: "Smartfon Samsung 128 GB z ekranem 6,8 cala, wyświetlacz Dynamic AMOLED 2X. Aparat 108 Mpix, pamięć 8 GB RAM, bateria 5000mAh. Obsługuje sieć: 5G",
    //         category: "Phone",
    //     },
    //     {
    //         id: 2,
    //         name: 'Xiaomi Mi 11 Ultra 5G 12/256GB',
    //         price: "5 699 zł",
    //         stock: 0,
    //         image: "https://mi-home.pl/cdn/shop/products/7592_k1-black-1200px-1_35179415-033a-4d1e-a2be-ed2a47fbaf26.png?v=1679742574&width=1260",
    //         description: "Smartfon Xiaomi 256 GB z ekranem 6,81 cala, wyświetlacz AMOLED. Aparat 50 Mpix, pamięć 12 GB RAM, bateria 5000mAh. Obsługuje sieć: 5G",
    //         category: "Phone",
    //     },
    //     {
    //         id: 3,
    //         name: 'LAPTOP HP PAVILION 14-CE0820ND / 4ET37EA / INTEL CORE I5 / 8GB / SSD 256GB / INTEL UHD / HD / WIN 11 / SZARY',
    //         price: "2 969 zł",
    //         stock: 2,
    //         image: "https://swiat-laptopow.pl/img/cms/HP%2014-ce/Laptop%20HP%20Pavilion%2014-ce_szary_3.png",
    //         description: "LAPTOP HP PAVILION 14 Nowoczesny i wydajny laptop HP Pavilion 14-ce to idealne narzędzie dla wymagających uczniów",
    //         category: "Laptop",
    //     },
    //     {
    //         id: 4,
    //         name: 'LAPTOP HP PAVILION 14-CE0820ND / 4ET37EA / INTEL CORE I5 / 8GB / SSD 256GB / INTEL UHD / HD / WIN 11 / SZARY',
    //         price: "2 969 zł",
    //         stock: 9,
    //         image: "https://swiat-laptopow.pl/img/cms/HP%2014-ce/Laptop%20HP%20Pavilion%2014-ce_szary_3.png",
    //         description: "LAPTOP HP PAVILION 14 Nowoczesny i wydajny laptop HP Pavilion 14-ce to idealne narzędzie dla wymagających uczniów",
    //         category: "Laptop",
    //     },
    //     {
    //         id: 5,
    //         name: 'LAPTOP HP PAVILION 14-CE0820ND / 4ET37EA / INTEL CORE I5 / 8GB / SSD 256GB / INTEL UHD / HD / WIN 11 / SZARY',
    //         price: "2 969 zł",
    //         stock: 0,
    //         image: "https://swiat-laptopow.pl/img/cms/HP%2014-ce/Laptop%20HP%20Pavilion%2014-ce_szary_3.png",
    //         description: "LAPTOP HP PAVILION 14 Nowoczesny i wydajny laptop HP Pavilion 14-ce to idealne narzędzie dla wymagających uczniów",
    //         category: "Laptop",
    //     },
    // ];


    const handleCategorySelect = (category) => {
        setFilteredCategory(category);
    };

    const onAddToCart = (id) => {
        addToCart(id);
    };

    const filteredProducts = filteredCategory ? products.filter((product) => product.category === filteredCategory) : products;
    const productRows = TileArray(filteredProducts, 4);
    const categories = Array.from(new Set(products.map((product) => product.category)));

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Navbar />
                        <div className="filter-and-product-container">
                            <ProductFilter
                                categories={categories}
                                onSelectCategory={handleCategorySelect}
                            />
                        </div>
                        <div className="product-list-container">
                            {productRows.map((row, rowIndex) => (
                                <div key={rowIndex} className="product-list-row">
                                    {row.map((product) => (
                                        <ProductTile key={product.id} product={product} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                }
            />

            <Route
                path="/product/:id"
                element={
                    <>
                        <Navbar />
                        <ProductPage products={products} />
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
