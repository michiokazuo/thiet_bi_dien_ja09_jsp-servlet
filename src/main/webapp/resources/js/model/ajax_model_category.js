const URL_CATEGORY = "category/";

function categoryFindAll() {
    return ajaxGet(`${URL_CATEGORY}find-all`);
}

function categorySearch_Sort(q) {
    return ajaxGet(`${URL_CATEGORY}search-sort?` + `${q}`);
}

function categoryInsert(category) {
    return ajaxPost(`${URL_CATEGORY}insert`,category);
}

function categoryUpdate(category) {
    return ajaxPut(`${URL_CATEGORY}update`, category);
}

function categoryDelete(category) {
    return ajaxDelete(`${URL_CATEGORY}delete?id=` + `${category.id}`, category);
}