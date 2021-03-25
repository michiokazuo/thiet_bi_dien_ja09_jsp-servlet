package com.bksoftwarevn.itstudent.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet(name = "LogOutController", value = "/dang-xuat")
public class LogOutController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie cookie = new Cookie("login-cookie", "phong");
        cookie.setMaxAge(-1);
        response.addCookie(cookie);

//        HttpSession httpSession = request.getSession();
//        httpSession.removeAttribute("login_session");

        response.sendRedirect("dang-nhap.tiles");
    }
}
