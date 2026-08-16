package com.mobileshop.backend.Service.users;

import java.util.List;

import org.hibernate.query.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mobileshop.backend.DTO.ProductPagination.Pagination;
import com.mobileshop.backend.DTO.ProductPagination.ProductResponse;
import com.mobileshop.backend.Entity.User.User;
import com.mobileshop.backend.Repository.users.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void storeUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // encode to save more secure
        userRepository.save(user);
    }

    public ProductResponse getAllUsers(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        org.springframework.data.domain.Page<User> userPgae= userRepository.findAll(pageable);

        Pagination pagination = new Pagination(userPgae.getTotalElements(), page + 1, size, userPgae.getTotalPages(), userPgae.hasNext());


        return new ProductResponse(userPgae.getContent(), pagination);

    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhone(user.getPhone());
            return userRepository.save(existingUser);
        }
        return null;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
