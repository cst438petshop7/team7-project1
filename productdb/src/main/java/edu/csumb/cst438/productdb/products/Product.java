package edu.csumb.cst438.productdb.products;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Product")
public class Product {
    @Id
    private String id;
    private ProductName name;
    private Description desc;
    private Image url;
    private Price price;
    private Stock stock;

    public Product (ProductName name, Description desc, Image url, Price price, Stock stock) {
        this.name = name;
        this.desc = desc;
        this.url = url;
        this.price = price;
        this.stock = stock;
    }

    public String getId() {
        return this.id;
    }

    public ProductName getProductName() {
        return this.name;
    }

    public Description getDescription() {
        return this.desc;
    }

    public Image getImageUrl() {
        return this.url;
    }

    public Price getPrice() {
        return this.price;
    }

    public Stock getStock() {
        return this.stock;
    }

}