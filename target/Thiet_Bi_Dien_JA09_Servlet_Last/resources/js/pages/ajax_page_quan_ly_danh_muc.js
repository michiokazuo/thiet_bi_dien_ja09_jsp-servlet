let selectSearchSort, textSearchName, btnSearch, tableData, textName, btnSave, btnDeleted;
let listCategory = []
let indexCategory, elementCategory, strRS;
$(async function () {
    selectSearchSort = $("#sort");
    textSearchName = $("#name-search");
    btnSearch = $("#btn-search");
    btnSave = $("#btn-save");
    btnDeleted = $("#btn-delete");
    textName = $("#name");
    tableData = $("#table-data");

    await loadCategory();

    viewCategory();
    searchCategory();
    confirmDeleteCategory();
    saveCategory();
    addCategory();
    sortCategory();
})

function viewCategory() {
    let rs = `<tr><td colspan='8'><strong>${strRS}</strong></td></tr>`;

    if (listCategory && listCategory.length > 0)
        rs = dataFilter(listCategory).map((data, index) => {
            return `<tr data-index="${index}">
            <th scope="row">${index + 1}</th>
            <td>${data.name}</td>
            <td>
                <button type="button" class="btn btn-warning update-category">
                    <i class="fas fa-pencil-alt"></i>
                    Sửa
                </button>
                <button type="button" class="btn btn-danger delete-category">
                    <i class="far fa-trash-alt"></i>
                    Xóa
                </button>
            </td></tr>`;
        }).join("");

    tableData.html(rs);
    deleteCategory();
    updateCategory();
}

function searchCategory() {
    btnSearch.click(async function () {
        await search_sortCategory();
    })
}

function deleteCategory() {
    $(".delete-category").click(function () {
        indexCategory = $(this).parents("tr").attr("data-index");

        $("#modal-delete").modal("show");
    })
}

function confirmDeleteCategory() {
    btnDeleted.click(async function () {
        let category = listCategory[indexCategory - 0];

        await categoryDelete(category).then(rs => {
            if (rs.message.toUpperCase() === ACT_SUCCESS) {
                if (rs.data) {
                    listCategory = listCategory.filter((data, index) => {
                        return index !== (indexCategory - 0);
                    })
                } else {

                }
            } else {
                strRS = rs.data;
            }
        }).catch(e => {
            console.log(e);
        });


        viewCategory();
        $("#modal-delete").modal("hide");
    })
}

function updateCategory() {
    $(".update-category").click(function () {
        indexCategory = $(this).parents("tr").attr("data-index");
        elementCategory = listCategory[indexCategory - 0];
        textName.val(elementCategory.name);

        $("#modal-category").modal("show");
    })
}

function saveCategory() {
    btnSave.click(async function () {
        let checkAction = false;
        elementCategory ? checkAction = true : elementCategory = {};

        let {val: valName, check: checkName} = checkData(textName, /./, "Định dạng tên chưa đúng");

        if (checkName) {
            elementCategory.name = valName;

            if (checkAction) {
                await categoryUpdate(elementCategory).then(rs => {
                    if (rs.message.toUpperCase() === ACT_SUCCESS) {
                        typeof rs.data === OBJECT ? (listCategory[indexCategory - 0] = rs.data) : (strRS = rs.data);
                    } else {
                        strRS = rs.data;
                    }
                }).catch(e => {
                    console.log(e);
                });
            } else {
                await categoryInsert(elementCategory).then(rs => {
                    if (rs.message.toUpperCase() === ACT_SUCCESS) {
                        typeof rs.data === OBJECT ? listCategory.push(elementCategory) : (strRS = rs.data);
                    } else {
                        strRS = rs.data;
                    }
                }).catch(e => {
                    console.log(e);
                });
            }

            selectSearchSort.prop('selectedIndex', 0);
            viewCategory();
            $("#modal-category").modal("hide");
        }
    })
}

function sortCategory() {
    selectSearchSort.click(async function () {
        await search_sortCategory();
    });
}

function addCategory() {
    $("#add-category").click(function () {
        elementCategory = null;

        $("#modal-category").modal("show");
    })
}

async function loadCategory() {
    await categoryFindAll().then(rs => {
        listCategory = [];
        if (rs.message.toUpperCase() === ACT_SUCCESS) {
            typeof rs.data === OBJECT ? (listCategory = rs.data) : (strRS = rs.data);
        } else {
            strRS = rs.data;
        }
    }).catch(e => {
        console.log(e);
    });
}

async function search_sortCategory() {
    let valSearchName = textSearchName.val();
    let valSelectSearchSort = selectSearchSort.val();
    let q = "name=" + valSearchName
        + (valSelectSearchSort === "" ? "" : ("&field=name&isASC=" + valSelectSearchSort.trim()));

    await categorySearch_Sort(q).then(rs => {
        listCategory = [];
        if (rs.message.toUpperCase() === ACT_SUCCESS) {
            (typeof rs.data === OBJECT) ? (listCategory = rs.data) : (strRS = rs.data);
        } else {
            strRS = rs.data;
        }
    }).catch(e => {
        console.log(e);
    });

    viewCategory();
}