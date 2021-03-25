<%--
  Created by IntelliJ IDEA.
  User: Phong
  Date: 8/18/2020
  Time: 8:40 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<link rel="stylesheet" href="resources/css/login.css">
<script src="resources/js/pages/ajax_page_dang_nhap.js"></script>

<div class="main-content page-login">
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-6 col-md-4">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title text-center">
                            <img src="https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-9/p960x960/57540167_1369260163198947_1293280215501373440_o.png?_nc_cat=104&_nc_sid=85a577&_nc_ohc=hoISz0aIRjEAX_HVD6o&_nc_ht=scontent.fhan5-4.fna&oh=4a22ba494706d4575c5d100732a5239f&oe=5F592325"
                                 width="60" class="d-inline-block align-top" alt="">
                            <h3>Đăng nhập</h3>
                        </div>
                        <form action="log-in" class="form-login" id="form-post-log-in" method="post">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Tài khoản</label>
                                    <input type="text" class="form-control" name="username" id="username" placeholder="Nhập tài khoản">
                                    <div class="invalid-feedback">
                                        Error!
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Mật khẩu</label>
                                    <input type="password" class="form-control" id="password" name="password"
                                           placeholder="Nhập mật khẩu">
                                    <div class="invalid-feedback">
                                        Error!
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 text-center">
                                <button type="button" class="btn btn-secondary" id="btn-login">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

