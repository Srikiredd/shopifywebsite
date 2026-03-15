package com.swaroop.ecommerce.Service;

import com.swaroop.ecommerce.model.Product;
import com.swaroop.ecommerce.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    // GET ALL PRODUCTS
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    // GET PRODUCT BY ID
    public Product getProductById(Long id) {
        Optional<Product> product = repository.findById(id);
        return product.orElse(null);
    }

    // ADD PRODUCT
    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    // UPDATE PRODUCT
    public Product updateProduct(Long id, Product product) {

        Product existingProduct = repository.findById(id).orElse(null);

        if(existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setImageUrl(product.getImageUrl());
            return repository.save(existingProduct);
        }

        return null;
    }

    // DELETE PRODUCT
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}