import { useEffect, useState } from 'react';
import { getAll, update } from '../../axios';
import { changeSubscribe } from '../../axios';
import ProductTile from "../Product/ProductTile";
import './ProfileInfo.css';
import { on } from 'form-data';
import { Link } from "react-router-dom";

function UserProfileInfo({ onSettingChange, listProduct, rate }) {
    const [userInfo, setUserInfo] = useState(null);
    const [newsletter, setNewsletter] = useState(null);
    const [confirmUnsubscribe, setConfirmUnsubscribe] = useState(false);
    const [products, setProducts] = useState(null);
    const [isPromotion, setIsPromotion] = useState(true);
    const [product, setProduct] = useState(null);
    const [currency, setCurrency] = useState('zł');
    const [isNetto, setIsNetto] = useState('brutto');

    async function fetchFromDatabase() {
        let user = await getAll(`https://localhost:7248/api/Users/GetByEmail`);
        setUserInfo(user);
        setNewsletter(user.newsletterSubscription);
        setProducts(listProduct);
        if (user.prodDatePromotion === new Date().toISOString().split('T')[0]) {
            setIsPromotion(false);
            let product = listProduct.find(p => p.id === Number(user.prodPromotion));
            setProduct(product);
            setIsNetto(user.bruttoNetto);
        }
    }

    useEffect(() => {
        fetchFromDatabase();
        
    }, []);

    

    
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    const handleSubscribeClick = () => {
        if (newsletter) {
            setConfirmUnsubscribe(true);
        } else {
            changeSubscribe(userInfo.id);
            setNewsletter(true);
        }
    };

    const handleUnsubscribeConfirm = (confirm) => {
        setConfirmUnsubscribe(false);
        if (confirm) {
            changeSubscribe(userInfo.id);
            setNewsletter(false);
        }
    };

    const handleSubmitClick = async () => {
        userInfo.currency = document.getElementById('selectbox1').value;
        userInfo.numOfProductOnPage = document.getElementById('selectbox2').value;
        userInfo.bruttoNetto = document.getElementById('selectbox3').value;
        setIsNetto(document.getElementById('selectbox3').value);
        setCurrency(document.getElementById('selectbox1').value);
        await update('https://localhost:7248/api/Users/ChangeOptions',userInfo);
        await fetchFromDatabase();
        onSettingChange();
    };

    const handleProdPromotion = async () => {
        if (!products || products.length === 0) {
            return;
        }
        let randomNumber = Math.floor(Math.random() * 9) + 2;
        //prodDatePromotion, prodPromotion, prodValuePromotion
        let randomProduct = products[Math.floor(Math.random() * products.length)];
        setProduct(randomProduct);
        userInfo.prodPromotion = String(randomProduct.id);
        userInfo.prodDatePromotion = new Date().toISOString().split('T')[0];
        userInfo.prodValuePromotion = String(randomNumber);
        setIsPromotion(false);
        await fetchFromDatabase();
        await update('https://localhost:7248/api/Users/ChangeProdPromotion',userInfo);
        await fetchFromDatabase();
        onSettingChange();
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = async (product) => {
    };
    

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p>Email: {userInfo.email}</p>
            <p>Username: {userInfo.username}</p>
            <p className="bold-text">Subscribe to newsletter</p>
            <button className={newsletter ? 'subscribe-button subscribed' : 'subscribe-button'} onClick={handleSubscribeClick}>
                SUBSCRIBE
            </button>
            <div className="confirm-buttons">
                {confirmUnsubscribe && (
                    <>
                        <div className="confirm-text">
                            <p className="bold-text">Are you sure you want to unsubscribe?</p>
                        </div>
                        <div className="confirm-actions">
                            <button className="confirm-button no" onClick={() => handleUnsubscribeConfirm(false)}>No</button>
                            <button className="confirm-button yes" onClick={() => handleUnsubscribeConfirm(true)}>Yes</button>
                        </div>
                    </>
                )}
            </div>

            <hr />

            <div className="selectboxes">
                <div className="selectbox">
                    <p>Select your currency:</p>
                    <select id="selectbox1" name="currency" value={userInfo.currency || "zł"} onChange={handleInputChange}>
                        <option value="zł">zł</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                        {/* Dodaj więcej opcji według potrzeb */}
                    </select>
                </div>
                <div className="selectbox">
                    <p>Select your amount on webside:</p>
                    <select id="selectbox2" name="numOfProductOnPage" value={userInfo.numOfProductOnPage || "8"} onChange={handleInputChange}>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        {/* Dodaj więcej opcji według potrzeb */}
                    </select>
                </div>
                <div className="selectbox">
                    <p>Select brutto/netto:</p>
                    <select id="selectbox3" name="bruttoNetto" value={userInfo.bruttoNetto || "brutto"} onChange={handleInputChange}>
                        <option value="brutto">Brutto</option>
                        <option value="netto">Netto</option>
                    </select>
                </div>
                <button onClick={handleSubmitClick}>Save</button>
            </div>
            <div className="selectboxes">
                {isPromotion && (
                    <button onClick={handleProdPromotion}>Promotion</button>
                )}
                {!isPromotion && (
                    <div className="product-tile">
                    <img className="product-image" src={`https://localhost:7248/Files/${product.thumbnailUrl}`} alt={product.name} />
                    <div className="product-info">
                        <div className="price-stock-container">
                            {(product.promotionPrice == null || product.promotionPrice == 0 ) ? (
                                <div className="price-price-container">
                                    <p className="price">Price: <del>{(product.price / rate).toFixed(2)} {currency}</del></p>
                                    <p className="price">{((product.price * ((100 - userInfo.prodValuePromotion)/100)) / rate).toFixed(2)} {currency}
                                        {isNetto == 'netto' && <span>+Vat</span>}
                                        </p>
                                </div>
                            ) : (
                                <div className="price-price-container">
                                    
                                    <p className="price">Price: <del>{(product.promotionPrice / rate).toFixed(2)} {currency}</del></p>
                                    <p className="price">{((product.promotionPrice * ((100 - userInfo.prodValuePromotion)/100)) / rate).toFixed(2)} {currency}
                                        {isNetto == 'netto' && <span>+Vat</span>}
                                        </p>
                                </div>
                            )}
    
                            <p className="stock">Stock: {product.quantity}</p>
                        </div>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="buttons-container">
                            <Link to={`/product/${product.id}`} className="view-more-btn">View more</Link>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default UserProfileInfo;
