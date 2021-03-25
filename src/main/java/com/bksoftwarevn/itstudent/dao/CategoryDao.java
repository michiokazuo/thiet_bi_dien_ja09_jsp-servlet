package com.bksoftwarevn.itstudent.dao;

import com.bksoftwarevn.itstudent.model.Category;

import java.sql.SQLException;
import java.util.List;

public interface CategoryDao extends BaseDao<Category> {
    List<Category> search_sort(String name, String field, Boolean isASC) throws SQLException;

}
