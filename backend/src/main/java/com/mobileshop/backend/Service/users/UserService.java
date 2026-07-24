package com.mobileshop.backend.Service.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.mobileshop.backend.Entity.User.User;
import com.mobileshop.backend.Repository.users.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;  

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void storeUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // encode to save more secure 
        userRepository.save(user);
    }   

    public List<User> getAllUsers() {
        return userRepository.findAll();
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
            return userRepository.save(existingUser);
        }
        return null; 
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }       
}
