export const filterProducts = (products, filters) => {
    return products.filter((product) => {
        if (product.category && product.category._id) {

            return filters.categories.includes(product.category._id);
        }
        // Handle the case where the category is null in the product
        return false;
    });
};

