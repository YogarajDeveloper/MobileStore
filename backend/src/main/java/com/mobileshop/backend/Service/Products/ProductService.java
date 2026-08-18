package com.mobileshop.backend.Service.Products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mobileshop.backend.DTO.ProductPagination.Pagination;
import com.mobileshop.backend.DTO.ProductPagination.ProductResponse;
import com.mobileshop.backend.Entity.Products.Products;
import com.mobileshop.backend.Repository.Products.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public void store(Products product){
        repository.save(product);
    }

    public ProductResponse getAllProducts(int page ,int size){

        Pageable pageable = PageRequest.of(page, size); //like a query

        Page<Products> productPage = repository.findAll(pageable);   

        Pagination pagination = new Pagination(productPage.getTotalElements(), page + 1, size, productPage.getTotalPages(), productPage.hasNext());

        return new ProductResponse(productPage.getContent(),pagination);

    }

    public List<Products> getByBrand(String brand){
        return repository.findByBrand(brand);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);       
    }

    
}
