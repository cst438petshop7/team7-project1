package edu.csumb.cst438.shopdb.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private Username username;
    private Cart cart;
    private Credit credit;

    public User (Username username, Cart cart, Credit credit) {
        this.username = username;
        this.cart = cart;
        this.credit = credit;
    }

    public String getId() {
        return this.id;
    }

    public Username getUsername() {
        return this.username;
    }

    public Cart getCartItems() {
        return this.cart;
    }

    public Credit getCredit() {
        return this.credit;
    }

}
