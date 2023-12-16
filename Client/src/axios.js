import axios from "axios";
import FormData from 'form-data';


function getOptions(method) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("loginToken")}`);

    var requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: 'follow'
    };

    return requestOptions;
}

async function postNewCategory(category, subCategories) {
    var newCategory = {};
    if(subCategories.length > 0) {
        newCategory = {
            Name: category,
            Subcategories: subCategories
        }
    }
    else {
        newCategory = {
            Name: category
        }
    }

    let params = new URLSearchParams(newCategory)
        .toString()
        .replaceAll("%2C", "&Subcategories=");
    const url = `https://localhost:7248/categories?${params}`;

    var requestOptions = getOptions('PUT');

    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function postNewUser(user) {
    
    const newUser = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        confirmPassword: user.password
      }
      console.log("user do dodania", newUser);
    const url = "https://localhost:7248/Auth/register";

    post(url, newUser);

}

async function postLogin(user) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(user);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    await fetch("https://localhost:7248/Auth/login", requestOptions)
    .then(response => response.text())
    .then(result => {
            localStorage.setItem("loginToken", result)})
    .catch(error => console.log('error', error));

    console.log(localStorage.getItem("loginToken"))
}

async function post(url, request) {

    await axios.post(url, request, {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
        }
      })
        .then(console.log(response));
}

async function deleteElement(url) {

    var requestOptions = requestOptions = getOptions('DELETE');

    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  }

async function getAll(url) {
    let results = [];

    var requestOptions = getOptions('GET');

    await fetch(url, requestOptions)
    .then(response => response.json())
    .then(response => {
        results = response
    });
        return results;
}

async function postNewProduct(product) {
    var formdata = new FormData();
    formdata.append("name", product.productName);
    formdata.append("categoryId", product.category);
    formdata.append("thumbnails", product.image);
    formdata.append("price", product.price);
    formdata.append("stock", product.quantity);
    formdata.append("description", product.description);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("loginToken")}`);

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    fetch("https://localhost:7248/Product", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

async function addToCart(id) {
    
    var requestOptions = getOptions('POST');

fetch(`https://localhost:7248/api/Shop?productId=${id}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

async function postNewReview(review) {
    

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("loginToken")}`);

    var raw = JSON.stringify({
    "description": review.comment,
    "rating": review.rating
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`https://localhost:7248/api/Review/${review.productId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

export { postNewCategory, postNewUser, postLogin, deleteElement, getAll, postNewProduct, addToCart, postNewReview };
