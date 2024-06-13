import React from "react";
import './DataTable.css';
import { useEffect } from "react";
import { getAll, update, deleteElement } from "../../axios";
import "./DataTable.css";
import "./ProductList.css";
function ProductList() {
    const [products,setProducts] = React.useState([]);
    const [selected,setSelected] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // Replace with your actual API call
            let productData = await getAll('https://localhost:7248/Product/Admin');
            const vatRates = await getAll("https://localhost:7248/Vat");
            for (const product of productData) {
                product.reviews = await getAll(`https://localhost:7248/api/Review/${product.id}`);
            }
            productData = productData.map(p => {
                const vatRate = vatRates.find(v => v.Name === p.vatType).Rate;
                const price = (p.netto * (1 + vatRate / 100)).toFixed(2);
                const promotionPrice = (p.promotionNetto * (1 + vatRate / 100)).toFixed(2);

                return {
                    id: p.id,
                    name: p.name,
                    price: price,
                    promotionPrice: p.promotionPrice !== undefined ? promotionPrice : null,
                    quantity: p.quantity,
                    description: p.description,
                    category: p.category,
                    hidden: p.hidden,
                    netto: p.netto,
                }
            });

            setProducts(productData);
        };

        fetchData();
    }, []);

    const toggleVisibility = async (productId) => {

        await update(`https://localhost:7248/Product/${productId}`, { hidden: !selected.hidden });

        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, hidden: !product.hidden } : product
            )
        );

        if (selected?.id === productId) {
            setSelected(prevSelected => ({ ...prevSelected, hidden: !prevSelected.hidden }));
        }
    };
    const handleDelete = async (productId) => {
        await deleteElement(`https://localhost:7248/Product/${productId}`);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    };

    const renderDetails = () => {
        const shortDescription = selected.description.length > 200
            ? selected.description.substring(0, 300) + '...'
            : selected.description;

        return (
            <div className="product-details">
                <div className="product-info">
                    <p className="product-info-item"><span>Name:</span> {selected.name}</p>
                    <hr />
                    <p className="product-info-item"><span>Category:</span> {selected.category}</p>
                    <hr />
                    <p className="product-info-item"><span>Netto:</span> {selected.netto}</p>
                    <hr />
                    <p className="product-info-item"><span>Quantity:</span> {selected.quantity}</p>
                    <hr />
                    <p className="product-info-item" style={{ whiteSpace: 'pre-wrap' }}><span>Description:</span> {shortDescription}</p>
                    <hr />
                    <p className="product-info-item">
                        <input type="checkbox" id="hidden" name="hidden" checked={!selected.hidden} onChange={() => toggleVisibility(selected.id)} />
                        <label htmlFor="hidden">Visibility</label>
                    </p>
                </div>
                <div className="product-action">
                    <button className="delete-button" onClick={() => handleDelete(selected.id)}>Delete</button>
                </div>
            </div>
        );
    };
    const handleOnSelect = (product) => {
        setSelected(selected?.id === product.id ? null : product);
    };

    return (
        <div className="data-list-container">
            <div className="data-details-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Visibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <React.Fragment key={index}>
                                <tr className="data-list-item" onClick={() => handleOnSelect(product)}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.promotionPrice ?? product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.hidden ? 'Hidden' : 'Visible'}</td>
                                </tr>
                                {selected?.id === product.id && (
                                    <tr>
                                        <td colSpan={6}>
                                            {renderDetails()}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                            //<React.Fragment key={index}>
                            //    <tr className={`data-list-item ${selectedData === dataItem ? "active" : ""}`} onClick={() => onSelectData(dataItem)}>
                            //        {columns.map((column, index) => (
                            //            <td key={index} className={column.className}>
                            //                {column.format ? column.format(dataItem[column.field]) : dataItem[column.field]}
                            //            </td>
                            //        ))}
                            //    </tr>
                            //    {selectedData === dataItem && (
                            //        <tr>
                            //            <td colSpan={columns.length}>
                            //                {selectedData.orderId ? renderDetails(selectedData, cancelOrder) : renderDetails(selectedData, handleDelete)}
                            //            </td>
                            //        </tr>
                            //    )}
                            //</React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;