package com.mobileshop.backend.Repository.Products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mobileshop.backend.Entity.Products.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products,Long> {

    List<Products> findByBrand(String brand);
}
