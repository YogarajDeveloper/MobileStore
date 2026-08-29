package com.mobileshop.backend.Controller.Products;

import com.mobileshop.backend.Service.Products.ProductService;
import org.springframework.web.bind.annotation.RestController;

import com.mobileshop.backend.DTO.ProductPagination.ProductRequest;
import com.mobileshop.backend.DTO.ProductPagination.ProductResponse;
import com.mobileshop.backend.Entity.Products.Products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/store")
    public ResponseEntity<?> storeProducts(@RequestBody Products product) {  
        productService.store(product);
        return ResponseEntity.ok("Product saved");
    }
    
   
    @PostMapping("/get-all")
    public ProductResponse getProducts(@RequestBody ProductRequest request ) {
        return productService.getAllProducts(request.getPage(), request.getSize());
    }
    
    @PostMapping("/get-by-brand/{brand}")
    public List<Products> getByBrand(@PathVariable String brand) {
        return productService.getByBrand(brand);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {   
        productService.deleteProduct(id);
        return "User deleted successfully!";
    }       
    
    
}
