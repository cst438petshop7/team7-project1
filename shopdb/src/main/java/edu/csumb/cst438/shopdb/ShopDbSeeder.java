package edu.csumb.cst438.shopdb;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import edu.csumb.cst438.shopdb.users.Cart;
import edu.csumb.cst438.shopdb.users.Credit;
import edu.csumb.cst438.shopdb.users.User;
import edu.csumb.cst438.shopdb.users.Username;


@Component
public class ShopDbSeeder implements CommandLineRunner {
    @Autowired
    IShopRepository shopRepo;

    @Override
    public void run(String... args) throws Exception {
        User John = new User(new Username("JohnDoe"), new Cart(Arrays.asList("Laptop", "Speakers")), new Credit(100));
        User Jane = new User(new Username("JaneDoe"), new Cart(Arrays.asList("Makeup", "Purse")), new Credit(75));
        User Jr = new User(new Username("JrDoe"), new Cart(Arrays.asList("PS4", "Skyrim")), new Credit(10));
        shopRepo.deleteAll();
        List<User> users = Arrays.asList(John, Jane, Jr);
        shopRepo.saveAll(users);
    }

}