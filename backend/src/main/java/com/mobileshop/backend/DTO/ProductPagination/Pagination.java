package com.mobileshop.backend.DTO.ProductPagination;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Pagination {

    private long totalItems;

    private int currentPage;

    private int pageSize;

    private int totalPages;

    private boolean hasNextPage;
}
