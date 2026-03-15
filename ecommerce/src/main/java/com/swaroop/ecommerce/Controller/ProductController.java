package com.swaroop.ecommerce.Controller;

import com.swaroop.ecommerce.model.Product;
import com.swaroop.ecommerce.Service.ProductService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // GET ALL PRODUCTS
    @GetMapping("/getProducts")
    public List<Product> getProducts() {
        return service.getAllProducts();
    }

    // GET PRODUCT BY ID
    @GetMapping("/getProduct/{id}")
    public Product getProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }

    // ADD PRODUCT
    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    // UPDATE PRODUCT
    @PutMapping("/updateProduct/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return service.updateProduct(id, product);
    }

    // DELETE PRODUCT
    @DeleteMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return "Product deleted successfully";
    }
}