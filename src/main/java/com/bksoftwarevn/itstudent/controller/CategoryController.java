package com.bksoftwarevn.itstudent.controller;

import com.bksoftwarevn.itstudent.model.Category;
import com.bksoftwarevn.itstudent.model.JsonResult;
import com.bksoftwarevn.itstudent.model.Product;
import com.bksoftwarevn.itstudent.service.CategoryService;
import com.bksoftwarevn.itstudent.service_impl.CategoryService_Impl;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "CategoryController", value = "/api/v1/category/*")
public class CategoryController extends HttpServlet {
    private CategoryService categoryService = new CategoryService_Impl();
    private JsonResult jsonResult = new JsonResult();

    // them
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";

        if (pathInfo != null && pathInfo.indexOf("/insert") == 0) {
            // se ko truyen bang param
            // Client gui 1 chuoi json len server
            // chuoi json phai co dinh dang tg dg
            // su dung gson chuyen chuoi json ->  category
            // thuc hien lay truong name

//            String name = req.getParameter("name");
            // su dung fromJson chuyen chuoi json ma client truyen len server thanh doi tuong tuon ung
            // tham so dau vao la bo dem hoac chuoi
            // tham so thu 2 la class muon chuyen tu json

            try {
                Category category = new Gson().fromJson(req.getReader(), Category.class);
                Category new_category = categoryService.insert(category.getName());
                rs = new_category == null ? jsonResult.jsonFailure("Insert fail!") : jsonResult.jsonSuccess(category);
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Insert Category Error!");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }


    // tim kiem
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";

        if (pathInfo != null && pathInfo.indexOf("/find-all") == 0) {
            // findAll
            try {
                List<Category> categoryList = categoryService.findAll();
//                rs = categoryList == null ? null : categoryList;
                rs = (categoryList != null && categoryList.size() > 0) ? jsonResult.jsonSuccess(categoryList) : jsonResult.jsonSuccess("No Data Category!");
            } catch (Exception e) {
                e.printStackTrace();
//                rs = "Find All Error";
                rs = jsonResult.jsonFailure("Find All Error!");
            }

            resp.getWriter().write(rs);
        } else if (pathInfo != null && pathInfo.indexOf("/find-by-id") == 0) {
            // findById
            try {
                String strId = req.getParameter("id");
                int id = Integer.parseInt(strId);

                Category category = categoryService.findById(id);
                rs = category == null ? jsonResult.jsonSuccess("Not Found Category Invalid!") : jsonResult.jsonSuccess(category);
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Find Category Error!");
            }

            resp.getWriter().write(rs);
        } else if (pathInfo != null && pathInfo.indexOf("/search-sort") == 0) {
            try {
                String name = req.getParameter("name");
                name = name == null ? "" : name;
                String field = req.getParameter("field");
                Boolean isASC = Boolean.valueOf(req.getParameter("isASC"));

                List<Category> categoryList = categoryService.search_sort(name, field, isASC);
                rs = (categoryList != null && categoryList.size() > 0) ? jsonResult.jsonSuccess(categoryList) : jsonResult.jsonSuccess("Not Found Category Invalid!");

            } catch (SQLException e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Find Category Error!");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }

    // xoa
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";

        if (pathInfo != null && pathInfo.indexOf("/delete") == 0) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));

                rs = jsonResult.jsonSuccess(categoryService.delete(id));
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Delete Category Error!");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }

    // sua
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";

        if (pathInfo != null && pathInfo.indexOf("/update") == 0) {
//            String name = req.getParameter("name");
//            String strId = req.getParameter("id");
//            int id = strId == null ? -1 : Integer.parseInt(strId);
//            Category category = new Category(id, name, false);

            try {
                Category category = new Gson().fromJson(req.getReader(), Category.class);
                Boolean temp = categoryService.update(category);

                rs = temp ? jsonResult.jsonSuccess(categoryService.findById(category.getId())) : jsonResult.jsonSuccess("Invalid Category");
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Update Category Error!");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }
}
