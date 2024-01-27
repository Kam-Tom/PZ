import axios from "axios";
import FormData from 'form-data';


export function getOptions(method) {
    return {
        method: method,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
        }
    };
}

export async function postNewPromotion(productName, amount, productId) {
    const data = {
        start: "2023-12-18T16:22:53.089Z",
        end: "2024-12-18T16:22:53.089Z",
        name: "Promocja na " + productName,
        description: "description",
        discount: amount
    };

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
        },
        data: data
    };

    let promotionId = 1;

    await axios("https://localhost:7248/api/Promotion", options)
        .then(response => promotionId = response.data)
        .catch(error => console.log('error', error));

    await axios(`https://localhost:7248/api/Promotion/${promotionId}/Add/${productId}`, options);
}

export async function postNewCategory(category, subCategories) {
    let newCategory = {};
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

    const options = getOptions('PUT');

    await axios.put(url, null, options)
        .then(response => console.log(response.data))
        .catch(error => console.log('error', error));
}

export async function postNewShippingMethod(name, cost) {
    const data = {
        name: name,
        cost: cost
    };

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
        },
        data: data
    };

    await axios("https://localhost:7248/ShippingMethod", options)
        .then(response => console.log(response.data))
        .catch(error => console.log('error', error));
}

export async function postNewUser(user) {
    
    const newUser = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        confirmPassword: user.password
      }
      console.log("user do dodania", newUser);
    const url = "https://localhost:7248/Auth/register";

    await axios.post(url, newUser, {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
        }
      })
        .then(response => console.log(response));

}

export async function postLogin(user) {
    const data = JSON.stringify(user);

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: data
    };

    await axios("https://localhost:7248/Auth/login", options)
        .then(response => {
            localStorage.setItem("loginToken", response.data);
            console.log(localStorage.getItem("loginToken"));
        })
        .catch(error => console.log('error', error));

    console.log(localStorage.getItem("loginToken"))
}

export async function deleteElement(url) {
    const options = getOptions('DELETE');
    let response;

    try {
        response = await axios.delete(url, options);
        console.log(response.data);
    } catch (error) {
        console.error('error', error);
    }

    return response;
}

export async function getAll(url) {
    const options = getOptions('GET');
    let results = [];

    await axios.get(url, options)
        .then(response => {
            results = response.data;
        })
        .catch(error => console.log('error', error));

    return results;
}

export async function postNewProduct(product) {
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("categoryId", product.category);
    formData.append("thumbnails", product.image);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("description", product.description);

    const options = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
        }
    };

    await axios.put("https://localhost:7248/Product", formData, options)
        .then(response => console.log(response.data))
        .catch(error => console.log('error', error));
}

export async function addToCart(id) {
    const options = getOptions('POST');

    await axios.post(`https://localhost:7248/api/Shop?productId=${id}`, null, options)
        .then(response => console.log(response.data))
        .catch(error => console.log('error', error));
}

export async function postNewReview(review) {
    const data = {
        description: review.comment,
        rating: review.rating
    };

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
        },
        data: data
    };

    await axios.post(`https://localhost:7248/api/Review/${review.productId}`, options)
        .then(response => console.log(response.data))
        .catch(error => console.log('error', error));
}
