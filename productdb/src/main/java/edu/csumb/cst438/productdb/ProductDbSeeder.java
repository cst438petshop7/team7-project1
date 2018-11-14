package edu.csumb.cst438.productdb;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import edu.csumb.cst438.productdb.products.Product;
import edu.csumb.cst438.productdb.products.Description;
import edu.csumb.cst438.productdb.products.Image;
import edu.csumb.cst438.productdb.products.Price;
import edu.csumb.cst438.productdb.products.ProductName;
import edu.csumb.cst438.productdb.products.Stock;


@Component
public class ProductDbSeeder implements CommandLineRunner {
    @Autowired
    IProductRepository shopRepo;

    @Override
    public void run(String... args) throws Exception {
        
        Product Catnip = new Product(new ProductName("Catnip"), new Description("Catnip for cats"), new Image(""), new Price(10), new Stock(5));
        Product Collar = new Product(new ProductName("Collar"), new Description("Collar for a cat"), new Image(""), new Price(10), new Stock(5));
        Product Kong = new Product(new ProductName("Kong"), new Description("Toy for dogs"), new Image(""), new Price(10), new Stock(5));
        shopRepo.deleteAll();
        List<Product> products = Arrays.asList(Catnip, Collar, Kong);
        shopRepo.saveAll(products);
    }

}