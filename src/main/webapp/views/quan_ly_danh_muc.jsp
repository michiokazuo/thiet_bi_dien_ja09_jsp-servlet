<%--
  Created by IntelliJ IDEA.
  User: Phong
  Date: 8/18/2020
  Time: 8:41 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="resources/js/pages/ajax_page_quan_ly_danh_muc.js"></script>
<script src="resources/js/model/ajax_model_category.js"></script>

<main>
    <!-- Modal -->
    <div class="modal fade" id="modal-category" tabindex="-1" aria-labelledby="detail-category" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detail-category">Chi tiết danh mục</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <form action="" id="form-post" novalidate>
                                    <div class="form-group">
                                        <label for="name"><strong>Tên</strong></label>
                                        <input type="text" class="form-control" name="name" id="name"
                                               placeholder="Nhập tên danh mục" required>
                                        <div class="invalid-feedback">
                                            Bạn chưa điền tên danh mục.
                                        </div>
                                    </div>
                                </form>
                            </div>
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
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                Bạn có chắc chắn muốn xóa danh mục này không?
                            </div>
                        </div>
                    </div>
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
                    <h1>Danh Mục Sản Phẩm</h1>
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
                <div class="col-md-10">
                    <button type="button" class="btn btn-primary" id="add-category">
                        <i class="fas fa-plus"></i>
                        Thêm danh mục
                    </button>
                </div>
                <div class="col-md-2">
                    <select class="form-control" id="sort">
                        <option value="">Sắp xếp</option>
                        <option value="true">A -> Z</option>
                        <option value="false">Z -> A</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="table-data">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive table-hover">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên danh mục</th>
                                <th scope="col">Hành động</th>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>
                                    <input class="form-control" type="text" id="name-search" name="name-search">
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
                                <td>Dây điện</td>
                                <td>
                                    <button type="button" class="btn btn-warning update-category" data-toggle="modal"
                                            data-target="#modal-category">
                                        <i class="fas fa-pencil-alt"></i>
                                        Sửa
                                    </button>
                                    <button type="button" class="btn btn-danger delete-category" data-toggle="modal"
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
