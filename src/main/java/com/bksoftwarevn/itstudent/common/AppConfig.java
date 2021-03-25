package com.bksoftwarevn.itstudent.common;

import java.util.Date;

public class AppConfig {

    public static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    public static final String URL_DATABASE = "jdbc:mysql://localhost:3306/thiet_bi_dien_v2";
    public static final String USERNAME = "root";
    public static final String PASSWORD = "20012000";

    public static void main(String[] args) {
        System.out.println(new Date().getTime() - new Date(1602522000000L).getTime());
    }

}
