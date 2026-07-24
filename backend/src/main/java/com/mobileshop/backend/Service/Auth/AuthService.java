package com.mobileshop.backend.Service.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mobileshop.backend.DTO.Login.LoginRequest;
import com.mobileshop.backend.DTO.Login.LoginResponse;
import com.mobileshop.backend.Entity.User.User;
import com.mobileshop.backend.Repository.users.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public LoginResponse login(LoginRequest request) {

        User existingUser = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), existingUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
    
        String token = jwtService.generateToken(existingUser.getEmail());

        return new LoginResponse("Login Success",token, existingUser.getEmail());
    }
} 