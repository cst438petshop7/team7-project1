package edu.csumb.cst438.shopdb.users;

import java.util.List;

public class Cart {
    private List<String> cart;

    public Cart (List<String> cart) {
        this.cart = cart;
    }

    public List<String> getCart() {
        return this.cart;
    }

}