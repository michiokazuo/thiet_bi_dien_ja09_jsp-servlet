<%--
  Created by IntelliJ IDEA.
  User: Phong
  Date: 8/18/2020
  Time: 8:40 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="resources/js/pages/ajax_page_quan_ly_san_pham.js"></script>
<script src="resources/js/model/ajax_model_product.js"></script>


<main>
    <!-- Modal -->
    <div class="modal fade" id="modal-product" tabindex="-1" aria-labelledby="detail-product" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detail-product">Chi tiết sản phẩm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <form action="" class="row" id="form-post" enctype="multipart/form-data" novalidate>
                                <div class="form-group col-md-6">
                                    <label for="name"><strong>Tên</strong></label>
                                    <input type="text" class="form-control" name="name" id="name"
                                           placeholder="Nhập tên sản phẩm" required>
                                    <div class="invalid-feedback">
                                        Bạn chưa nhập tên sản phẩm.
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="category"><strong>Loại sản phẩm</strong></label>
                                    <select class="form-control" name="category" id="category" required>
                                        <option selected disabled value="">Loại sản phẩm</option>
                                        <option value="1">Điện thoại</option>
                                        <option value="2">Dây điện</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="price"><strong>Giá</strong></label>
                                    <input type="number" min="0"
                                           class="form-control " name="price" id="price"
                                           placeholder="Nhập giá sản phẩm" required>
                                    <div class="invalid-feedback">
                                        Bạn chưa nhập giá sản phẩm.
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="bought"><strong>Đã bán</strong></label>
                                    <input type="number" min="0" oninput="validity.valid||(value='');"
                                           class="form-control " name="bought" id="bought"
                                           placeholder="Nhập số lượng đã bán" required>
                                    <div class="invalid-feedback">
                                        Bạn chưa nhập số lượng đã bán.
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="guarantee"><strong>Bảo hành</strong></label>
                                    <input type="number" min="0" oninput="validity.valid||(value='');"
                                           class="form-control " name="guarantee" id="guarantee"
                                           placeholder="Nhập thời gian bảo hành" required>
                                    <div class="invalid-feedback">
                                        Bạn chưa nhập thời gian bảo hành.
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="promotion"><strong>Khuyến mãi</strong></label>
                                    <input type="number" min="0" oninput="validity.valid||(value='');"
                                           class="form-control " name="promotion" id="promotion"
                                           placeholder="Nhập khuyến mãi" required>
                                    <div class="invalid-feedback">
                                        Bạn chưa nhập khuyến mãi.
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="image"><strong>Ảnh</strong></label>
                                    <input class="form-control-file" accept="image/*" type="file" name="image" id="image" required>
                                    <div class="invalid-feedback">
                                        Bạn chưa chọn ảnh.
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="create-date"><strong>Ngày tạo</strong></label>
                                    <input class="form-control " type="date" name="create-date" id="create-date"
                                           readonly>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="introduction"><strong>Giới thiệu</strong></label>
                                    <textarea class="form-control " name="introduction"
                                              id="introduction" required></textarea>
                                    <div class="invalid-feedback">
                                        Bạn chưa nhập giới thiệu.
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="specification"><strong>Thông số</strong></label>
                                    <textarea class="form-control " name="specification"
                                              id="specification" required></textarea>
                                    <div class="invalid-feedback">
                                        Bạn chưa nhập thông số.
                                    </div>
                                </div>
                                <div class="custom-control custom-checkbox my-1 mr-sm-2 col-md-6 ml-3">
                                    <input type="checkbox" name="sold-out" id="sold-out"
                                           class="custom-control-input">
                                    <label class="custom-control-label" for="sold-out"><strong>Hết
                                        hàng</strong></label>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-success" id="btn-save">Lưu</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-delete" tabindex="-1" aria-labelledby="delete-category" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Xác nhận thao tác</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Bạn có chắc chắn muốn xóa sản phẩm này không ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" id="btn-delete">Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <div class="title-page">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <h1>Sản Phẩm</h1>
                </div>
                <div class="col-12">
                    <hr>
                </div>
            </div>
        </div>
    </div>

    <div class="tool-page">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <button type="button" class="btn btn-primary" id="add-product">
                        <i class="fas fa-plus"></i>
                        Thêm sản phẩm
                    </button>
                </div>
                <div class="col-md-2">
                    <select class="form-control" name="category" id="category-section">
                        <option selected disabled value="">Loại sản phẩm</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-control" name="sort" id="sort">
                        <option value="">Sắp xếp</option>
                        <option value="name-true">(Tên)A -> Z</option>
                        <option value="name-false">(Tên)Z -> A</option>
                        <option value="bought-false">Bán chạy nhất</option>
                        <option value="create_date-false">Mới nhất</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <div class="table-data">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col" style="width: 120px;">Ảnh</th>
                                <th scope="col" style="width: 150px;">Tên</th>
                                <th scope="col" style="width: 150px;">Giá</th>
                                <th scope="col" style="width: 150px;">Đã bán</th>
                                <th scope="col">Ngày tạo</th>
                                <th scope="col" style="width: 150px;">Hết hàng</th>
                                <th scope="col" style="width: 200px;">Hành động</th>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td scope="row"></td>
                                <td>
                                    <input class="form-control" type="text"
                                           name="name-search" id="name-search">
                                </td>
                                <td>
                                    <input class="form-control" type="number" min="0"
                                           name="price-search" id="price-search">
                                </td>
                                <td>
                                    <input class="form-control" type="number" min="0"
                                           oninput="validity.valid||(value='');"
                                           name="bought-search" id="bought-search">
                                </td>
                                <td>
                                    <input class="form-control" type="date" name="create-date-search" id="create-date-search">
                                </td>
                                <td>
                                    <select class="form-control" name="sold-out-search" id="sold-out-search">
                                        <option value="">Tất cả</option>
                                        <option value="true">Hết hàng</option>
                                        <option value="false">Còn hàng</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary" id="btn-search">
                                        <i class="fas fa-search"></i>
                                        Tìm kiếm
                                    </button>
                                </td>
                            </tr>
                            </thead>
                            <tbody id="table-data">
                            <tr>
                                <th scope="row">1</th>
                                <td>
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/88268/samsung-galaxy-a5-2017-400x460.png"
                                         alt=""
                                         width="50px" height="60px">
                                </td>
                                <td>Mark</td>
                                <td>Mark</td>
                                <td>Mark</td>
                                <td>Mark</td>
                                <td>
                                    <span class="badge badge-success">Còn hàng</span>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-warning update-product" data-toggle="modal"
                                            data-target="#modal-product">
                                        <i class="fas fa-pencil-alt"></i>
                                        Sửa
                                    </button>
                                    <button type="button" class="btn btn-danger delete-product" data-toggle="modal"
                                            data-target="#modal-delete">
                                        <i class="far fa-trash-alt"></i>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>