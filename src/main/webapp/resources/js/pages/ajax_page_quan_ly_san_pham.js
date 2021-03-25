// cu phap de dam bao tat cac phan tu da duoc load xong de thao tac len no

// DN cac thanh phan can thao tac
let selectSearchCategory, selectSearchSort, textSearchName, numberSearchPrice, numberSearchBought,
    dateSearchCreateDate, selectSearchSoldOut, btnSearch, tableData, textName, selectCategory, numberPrice,
    numberBought, numberGuarantee, numberPromotion, fileImage, dateCreateDate, textareaIntroduction,
    textareaSpecification, checkboxSoldOut, btnSave, btnDeleted;
let listProduct = [];
let listCategory = [];
let indexProduct, elementProduct, strRS;
$(async function () {
    selectSearchCategory = $("#category-section");
    selectSearchSort = $("#sort");
    textSearchName = $("#name-search");
    numberSearchPrice = $("#price-search");
    numberSearchBought = $("#bought-search");
    dateSearchCreateDate = $("#create-date-search");
    selectSearchSoldOut = $("#sold-out-search");
    btnSearch = $("#btn-search");
    tableData = $("#table-data");
    textName = $("#name");
    selectCategory = $("#category");
    numberPrice = $("#price");
    numberGuarantee = $("#guarantee");
    numberPromotion = $("#promotion");
    numberBought = $("#bought");
    fileImage = $("#image");
    dateCreateDate = $("#create-date");
    textareaIntroduction = $("#introduction");
    textareaSpecification = $("#specification");
    checkboxSoldOut = $("#sold-out");
    btnSave = $("#btn-save");
    btnDeleted = $("#btn-delete");

    await ajaxGet(`category/find-all`).then(rs => {
        listCategory = [];
        if (rs.message.toUpperCase() === ACT_SUCCESS) {
            typeof rs.data === OBJECT ? (listCategory = rs.data) : (strRS = rs.data);
        } else {
            strRS = rs.data;
        }
    }).catch(e => {
        console.log(e);
    });

    await loadProduct();

    searchProduct();
    viewProduct();
    confirmDeleteProduct();
    saveProduct();
    addProduct();
    viewSelectCategory();
    sortProduct();
});

function viewSelectCategory() {
    let rs = `<option value="">Loại sản phẩm</option>`;
    if (listCategory && listCategory.length > 0) {
        rs += dataFilter(listCategory).map((data, index) => {
            return `<option value="${data.id}">${data.name}</option>`
        }).join("");
    }

    selectSearchCategory.html(rs);
    selectCategory.html(rs);

    selectProductOfCategory();
}

function sortProduct() {
    selectSearchSort.click(async function () {
        await search_sortProduct();
    });
}

function selectProductOfCategory() {
    selectSearchCategory.click(async function () {
        await search_sortProduct();
    });

}

function viewProduct() {
    let result = `<tr><td colspan='8'><strong>${strRS}</strong></td></tr>`;

    if (listProduct && listProduct.length > 0) {
        // map thực hiện duyệt lần lượt các phần tử trong mảng, nếu có return nó sẽ trả về một mảng mới
        // là kết quả vừa thao tác được
        result = dataFilter(listProduct).map((data, index) => {
            // template string
            // là một chuỗi cho phép thực hiện các phép toán trong cú pháp ${}
            return `<tr data-index="${index}">
                        <th scope="row">${index + 1}</th>
                        <td><img src="${data.image}"
                                 alt="" width="80px"></td>
                        <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.bought}</td>
                        <td>${data.createDate}</td>
                        <td class="text-center">${data.soldOut ? "<span class=\"badge badge-danger\">Hết hàng</span>" : "<span class=\"badge badge-success\">Còn hàng</span>"}</td>
                        <td>
                            <button type="button" class="btn btn-warning update-product"><i class="fas fa-pen"></i>
                                Sửa</button>
                            <button type="button" class="btn btn-danger delete-product"><i class="fas fa-trash-alt"></i>
                                Xóa</button>
                        </td>
                </tr>`;
        }).join("");
    }

    // Hàm này có chức năng xóa hết html cũ, và in vào dữ liệu mới
    tableData.html(result);
    deleteProduct();
    updateProduct();
}

function searchProduct() {
    btnSearch.click(async function () {
        await search_sortProduct();
    })
}

function deleteProduct() {
    $(".delete-product").click(function () {
        indexProduct = $(this).parents("tr").attr("data-index");

        $("#modal-delete").modal("show");
    })
}

function confirmDeleteProduct() {
    btnDeleted.click(async function () {
        let product = listProduct[indexProduct - 0];

        await productDelete(product).then(rs => {
            if (rs.message.toUpperCase() === ACT_SUCCESS) {
                if (rs.data) {
                    listProduct = listProduct.filter((data, index) => {
                        return index !== (indexProduct - 0);
                    });
                } else {

                }
            } else {
                strRS = rs.data;
            }
        }).catch(e => {
            console.log(e);
        });

        viewProduct();
        $("#modal-delete").modal("hide");
    })
}

function updateProduct() {
    $(".update-product").click(function () {
        indexProduct = $(this).parents("tr").attr("data-index");
        elementProduct = listProduct[indexProduct - 0];
        textName.val(elementProduct.name);
        selectCategory.val(elementProduct.categoryId);
        numberPrice.val(elementProduct.price);
        numberGuarantee.val(elementProduct.guarantee);
        numberPromotion.val(elementProduct.promotion);
        numberBought.val(elementProduct.bought);
        // fileImage.val(elementProduct.image);
        dateCreateDate.val(elementProduct.createDate);
        textareaIntroduction.val(elementProduct.introduction);
        textareaSpecification.val(elementProduct.specification);
        elementProduct.soldOut ? checkboxSoldOut.prop("checked", true) : checkboxSoldOut.prop("checked", false);

        $("#modal-product").modal("show");
    })
}

function saveProduct() {
    btnSave.click(async function () {
        let {val: valName, check: checkName} = checkData(textName, /./, "Định dạng tên chưa đúng");
        let valCategory = selectCategory.val();
        let {val: valPrice, check: checkPrice} = checkData(numberPrice, /^\d+(|\.\d+)$/, "Giá bán phải là số");
        let {val: valBought, check: checkBought} = checkData(numberBought, /^\d+$/, "Nhập số lượng đã bán");
        let {val: valGuarantee, check: checkGuarantee} = checkData(numberGuarantee, /^\d+$/, "Nhập thời gian bảo hành");
        let {val: valPromotion, check: checkPromotion} = checkData(numberPromotion, /^\d+$/, "Nhập phần trăm khuyến mãi");
        let valFileImg = checkData(fileImage, /./, "Please choose a img");
        let valIntroduction = textareaIntroduction.val();
        let valSpecification = textareaSpecification.val();
        let valSoldOut = checkboxSoldOut.is(":checked");
        if (checkPromotion && checkPrice && checkName && checkGuarantee && checkBought) {
            let checkAction = false;
            elementProduct ? checkAction = true : elementProduct = {};

            elementProduct.name = valName;
            elementProduct.categoryId = valCategory;
            elementProduct.price = valPrice;
            elementProduct.soldOut = valSoldOut;
            elementProduct.bought = valBought;
            elementProduct.guarantee = valGuarantee;
            elementProduct.promotion = valPromotion;
            elementProduct.introduction = valIntroduction;
            elementProduct.specification = valSpecification;
            elementProduct.soldOut = valSoldOut;

            if (valFileImg !== "") {
                let formData = new FormData();
                formData.append("image", fileImage.prop("files")[0]);
                await ajaxUploadFile(`upload-file`, formData).then(rs => {
                    console.log(typeof rs)
                    if (rs.message.toUpperCase() === ACT_SUCCESS) {
                        (typeof rs.data === OBJECT) ? (elementProduct.image = rs.data[0]) : (strRS = rs.data[0]);
                    } else {
                        strRS = rs.data[0];
                    }
                }).catch(e => {
                    console.log(e)
                });
            }

            if (checkAction) {
                await productUpdate(elementProduct).then(rs => {
                    if (rs.message.toUpperCase() === ACT_SUCCESS) {
                        typeof rs.data === OBJECT ? (listProduct[indexProduct - 0] = rs.data) : (strRS = rs.data);
                    } else {
                        strRS = rs.data;
                    }
                }).catch(e => {
                    console.log(e);
                });
            } else {
                await productInsert(elementProduct).then(rs => {
                    if (rs.message.toUpperCase() === ACT_SUCCESS) {
                        typeof rs.data === OBJECT ? listProduct.push(elementProduct) : (strRS = rs.data);
                    } else {
                        strRS = rs.data;
                    }
                }).catch(e => {
                    console.log(e);
                });

            }

            await loadProduct();
            viewProduct();
            selectSearchSort.prop('selectedIndex', 0);
            $("#modal-product").modal("hide");
        }
    })
}

function addProduct() {
    $("#add-product").click(function () {
        elementProduct = null;
        $("#modal-product").modal("show");
    })
}

async function loadProduct() {
    await productFindAll().then(rs => {
        listProduct = [];
        if (rs.message.toUpperCase() === ACT_SUCCESS) {
            typeof rs.data === OBJECT ? (listProduct = rs.data) : (strRS = rs.data);
        } else {
            strRS = rs.data;
        }
    }).catch(e => {
        console.log(e);
    });
}

async function search_sortProduct() {
    let listP1 = [];
    let listP2 = listProduct;

    let valSearchName = textSearchName.val();
    let valSearchPrice = numberSearchPrice.val();
    let valSearchBought = numberSearchBought.val();
    let valSearchCreateDate = dateSearchCreateDate.val();
    let valSearchSoldOut = selectSearchSoldOut.val();
    let categorySearch = selectSearchCategory.val();
    let valSelectSearchSort = selectSearchSort.val().trim();

    let q1 = "name=" + valSearchName
        + (valSearchPrice === "" ? "" : ("&price=" + valSearchPrice))
        + (valSearchBought === "" ? "" : ("&bought=" + valSearchBought))
        + ("&soldOut=" + valSearchSoldOut)
        + (valSearchCreateDate === "" ? "" : ("&startDate=" + valSearchCreateDate + "&endDate=" + valSearchCreateDate))
        + (categorySearch === "" ? "" : ("&category=" + categorySearch));

    await productSearch(q1).then(rs => {
        if (rs.message.toUpperCase() === ACT_SUCCESS) {
            (typeof rs.data === OBJECT) ? (listP1 = rs.data) : (strRS = rs.data);
        } else {
            strRS = rs.data;
        }
    }).catch(e => {
        console.log(e);
    });

    let valSort = valSelectSearchSort.split("-");
    let q2 = "field=" + valSort[0] + "&isASC=" + valSort[1];
    await productSort(q2).then(rs => {
        if (rs.message.toUpperCase() === ACT_SUCCESS) {
            typeof rs.data === OBJECT ? (listP2 = rs.data) : (strRS = rs.data);
        } else {
            strRS = rs.data;
        }
    }).catch(e => {
        console.log(e);
    });

    listProduct = listP1;
    if (listP1 && listP1.length > 0)
        listProduct = listP2.filter((data, index) => {
            return listP1.find((d, i) => {
                return d.id === data.id;
            });
        });

    viewProduct();
}