package com.bksoftwarevn.itstudent.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "LoginFilter", urlPatterns = {"/trang-chu.tiles", "/danh-muc.tiles", "/san-pham.tiles", "/dang-xuat"})
public class LoginFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletResponse response = (HttpServletResponse) resp;
        HttpServletRequest request = (HttpServletRequest) req;

//        HttpSession httpSession = request.getSession();
//
//        if (httpSession.getAttribute("login_session") == null)
//            response.sendRedirect("dang-nhap.tiles");

        boolean check = false;

        Cookie[] cookies = request.getCookies();

        if (cookies != null) {

            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("login-cookie")) {
                    check = true;
                    break;
                }
            }
        }

        if (!check) response.sendRedirect("dang-nhap.tiles");
        chain.doFilter(request, response);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
