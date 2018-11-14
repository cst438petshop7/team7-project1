package edu.csumb.cst438.productdb;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.csumb.cst438.productdb.products.Product;

@RestController
public class ProductController {
    @Autowired
    IProductRepository productRepository;
    
    @GetMapping ("/allProducts")
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products;
    }

}