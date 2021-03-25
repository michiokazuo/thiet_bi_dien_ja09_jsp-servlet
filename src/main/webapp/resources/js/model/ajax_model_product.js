const URL_PRODUCT = "product/";

function productFindAll() {
    return ajaxGet(`${URL_PRODUCT}find-all`);
}

function productFindByCategory(q) {
    return ajaxGet(`${URL_PRODUCT}find-by-category?` + `${q}`)
}

function productSearch(q) {
    return ajaxGet(`${URL_PRODUCT}search?` + `${q}`);
}

function productInsert(product) {
    return ajaxPost(`${URL_PRODUCT}insert`,product);
}

function productUpdate(product) {
    return ajaxPut(`${URL_PRODUCT}update`, product);
}

function productDelete(product) {
    return ajaxDelete(`${URL_PRODUCT}delete?id=` + `${product.id}`, product);
}

function productSort(q) {
    return ajaxGet(`${URL_PRODUCT}sort-by?` + `${q}`);
}