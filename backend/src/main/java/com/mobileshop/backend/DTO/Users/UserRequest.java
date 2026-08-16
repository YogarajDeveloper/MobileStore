package com.mobileshop.backend.DTO.Users;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserRequest {

    private int page;
    private int size;
        
}
