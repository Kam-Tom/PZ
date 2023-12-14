import axios from "axios";

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

async function getProducts() {
    let produkty = [];
    await axios.get("https://localhost:7248/products")
        .then(response => {
            produkty = response;
            console.log("produkty get", produkty);
        });
    return produkty;
}

export { postNewCategory, getProducts };
