package com.bksoftwarevn.itstudent.controller;

import com.bksoftwarevn.itstudent.model.Category;
import com.bksoftwarevn.itstudent.model.JsonResult;
import com.bksoftwarevn.itstudent.model.Product;
import com.bksoftwarevn.itstudent.service.ProductService;
import com.bksoftwarevn.itstudent.service_impl.ProductService_Impl;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@WebServlet(name = "ProductController", value = "/api/v1/product/*")
public class ProductController extends HttpServlet {
    private JsonResult jsonResult = new JsonResult();
    private ProductService productService = new ProductService_Impl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";

        if (pathInfo != null && pathInfo.indexOf("/find-all") == 0) {
            try {
                rs = jsonResult.jsonSuccess(productService.findAll());
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Find All Error!");
            }

            resp.getWriter().write(rs);
        } else if (pathInfo != null && pathInfo.indexOf("/find-by-id") == 0) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));
                Product product = productService.findById(id);
                rs = product == null ? jsonResult.jsonSuccess("Not Found Product Valid!") : jsonResult.jsonSuccess(product);
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Find By Id Error!");
            }

            resp.getWriter().write(rs);
        } else if (pathInfo != null && pathInfo.indexOf("/find-by-category") == 0) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));
                List<Product> productList = productService.findByCategory(id);
                rs = (productList != null && productList.size() > 0) ? jsonResult.jsonSuccess(productList) : jsonResult.jsonSuccess("No Product Of Category!");
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Find By Category Error!");
            }

            resp.getWriter().write(rs);
        } else if (pathInfo != null && pathInfo.indexOf("/search") == 0) {
            try {
                String name = req.getParameter("name");
                name = name == null ? "" : name;
                String startDate = req.getParameter("startDate");
                String endDate = req.getParameter("endDate");
                String str_soldOut = req.getParameter("soldOut");
                Boolean soldOut = str_soldOut.equals("") ? null : Boolean.valueOf(str_soldOut);
                String str_gua = req.getParameter("guarantee");
                int guarantee = str_gua == null ? -1 : Integer.parseInt(str_gua);
                String str_category = req.getParameter("category");
                int category = str_category == null ? -1 : Integer.parseInt(str_category);
                String str_bought = req.getParameter("bought");
                int bought = str_bought == null ? -1 : Integer.parseInt(str_bought);
                String str_promotion = req.getParameter("promotion");
                int promotion = str_promotion == null ? -1 : Integer.parseInt(str_promotion);
                String str_price = req.getParameter("price");
                double price = str_price == null ? -1 : Double.parseDouble(str_price);

                List<Product> productList = productService.search(name, startDate, endDate, soldOut, guarantee, category, bought, promotion, price);
                rs = (productList != null && productList.size() > 0) ? jsonResult.jsonSuccess(productList) : jsonResult.jsonSuccess("Not Found!");
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Search Error!");
            }

            resp.getWriter().write(rs);

        } else if (pathInfo != null && pathInfo.indexOf("/sort-by") == 0) {
            try {
                String field = req.getParameter("field");
                String str_isASC = req.getParameter("isASC");
                Boolean isASC = (!str_isASC.equals("true") && !str_isASC.equals("false")) ? null : Boolean.valueOf(str_isASC);

                List<Product> productList = productService.sortBy(field, isASC);
                rs = (productList != null && productList.size() > 0) ? jsonResult.jsonSuccess(productList) : jsonResult.jsonSuccess("No Data!");
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Sort By Error");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";
        Gson gson = new GsonBuilder().setDateFormat("MM-dd-yyyy").create();

        if (pathInfo != null && pathInfo.indexOf("/insert") == 0) {
            try {

                Product product = gson.fromJson(req.getReader(), Product.class);
                Product new_product = productService.insert(product);
                rs = new_product == null ? jsonResult.jsonSuccess("Insert fail") : jsonResult.jsonSuccess(new_product);
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Insert Product Error");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";
        Gson gson = new GsonBuilder().setDateFormat("MM-dd-yyyy").create();

        if (pathInfo != null && pathInfo.indexOf("/update") == 0) {
            try {
                Product product = gson.fromJson(req.getReader(), Product.class);
                Product needProduct = productService.findById(product.getId());
                if (product.getImage().equals("")) product.setImage(needProduct.getImage());
                Boolean temp = productService.update(product);

                rs = temp ? jsonResult.jsonSuccess(productService.findById(product.getId())) : jsonResult.jsonSuccess("Invalid Category");
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Update Product Error");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        String rs = "";

        if (pathInfo != null && pathInfo.indexOf("/delete") == 0) {
            try {
                int id = Integer.parseInt(req.getParameter("id"));

                rs = jsonResult.jsonSuccess(productService.delete(id));
            } catch (Exception e) {
                e.printStackTrace();
                rs = jsonResult.jsonFailure("Delete Product Error");
            }

            resp.getWriter().write(rs);
        } else {
            resp.sendError(404, "URL is not supported.");
        }
    }
}
