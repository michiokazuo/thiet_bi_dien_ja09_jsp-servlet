package com.bksoftwarevn.itstudent.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet(name = "LogInController", value = "/log-in")
public class LogInController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println(username + "    " + password);

        if (username != null && password != null && !username.equals("") && !password.equals("")) {
//            HttpSession httpSession = request.getSession();
//            httpSession.setAttribute("login_session", "phong");

            Cookie cookie = new Cookie("login-cookie", "phong");
            response.addCookie(cookie);

            response.sendRedirect("trang-chu.tiles");
        } else {
            response.sendRedirect("dang-nhap.tiles");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
