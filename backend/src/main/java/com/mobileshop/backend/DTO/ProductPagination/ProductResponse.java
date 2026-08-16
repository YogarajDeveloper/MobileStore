package com.mobileshop.backend.DTO.ProductPagination;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponse {

    private List<?> content;

    private Pagination pagination;
}