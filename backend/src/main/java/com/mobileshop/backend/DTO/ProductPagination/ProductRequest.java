package com.mobileshop.backend.DTO.ProductPagination;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductRequest {
    
    private int page;
    private int size;
}
