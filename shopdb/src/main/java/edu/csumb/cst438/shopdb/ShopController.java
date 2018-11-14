package edu.csumb.cst438.shopdb;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.csumb.cst438.shopdb.users.User;

@RestController
public class ShopController {
    @Autowired
    IShopRepository shopRepository;

    @GetMapping ("/allUsers")
    public List<User> getAll() {
        List<User> users = shopRepository.findAll();
        return users;
    }

}