import axios from "axios";
import FormData from 'form-data';
import { tokenLogin } from "./components/Account/LoginRegister"

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

    await axios.put(url)
        .then(console.log("Category posted successfully"));

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
    let token = "";
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
    .then(result => {token = result; console.log(token)})
    .catch(error => console.log('error', error));

    return token;
}

async function post(url, request) {

    await axios.post(url, request, {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        }
      })
        .then(console.log(response));
}

async function deleteElement(url) {
  
    await axios.delete(url)
        .then(console.log("Deleted successfully"));
  
  }

async function getAll(url) {
  let results = [];

  await fetch(url)
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

    var requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow'
    };

    fetch("https://localhost:7248/Product", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

async function addToCart(id) {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokenLogin}`);
    console.log(tokenLogin);
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(`https://localhost:7248/api/Shop?productId=${id}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

export { postNewCategory, postNewUser, postLogin, deleteElement, getAll, postNewProduct, addToCart };
