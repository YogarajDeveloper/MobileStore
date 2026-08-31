package com.mobileshop.backend.Controller.users;

import org.springframework.web.bind.annotation.RestController;

import com.mobileshop.backend.DTO.ProductPagination.ProductResponse;
import com.mobileshop.backend.DTO.Users.UserRequest;
import com.mobileshop.backend.Entity.User.User;
import com.mobileshop.backend.Service.users.UserService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public  ResponseEntity<?> storeUser(@RequestBody User user) {
        userService.storeUser(user);
        return ResponseEntity.ok("User stored successfully!");
    }

    @PostMapping("/get-all")
    public ProductResponse getallUsers(@RequestBody UserRequest request) {
        return userService.getAllUsers(request.getPage(),request.getSize()); 
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {   
        userService.deleteUser(id);
        return "User deleted successfully!";
    }       
    
}
