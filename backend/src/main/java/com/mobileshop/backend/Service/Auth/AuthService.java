package com.mobileshop.backend.Service.Auth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${google.client.id}")
    private String googleClientId;

    // login method for email and password authentication
    public LoginResponse login(LoginRequest request) {

        User existingUser = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), existingUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
    
        String token = jwtService.generateToken(existingUser.getEmail());

        return new LoginResponse("Login Success",token, existingUser.getEmail());
    }

    //login method for google authentication
    public LoginResponse googleLogin(String googleToken) {
        try {
            // Decode Google token
            Map<String, Object> claims = decodeGoogleToken(googleToken);

            // getting the client ID from the token claims
            String tokenClientId = (String) claims.get("aud"); 

            // Validate the client ID
            if (!tokenClientId.equals(googleClientId)) {
                throw new RuntimeException("Invalid Client ID");
            }
            
            String email = (String) claims.get("email");
            String name = (String) claims.get("name");
            String picture = (String) claims.get("picture");

            // Check user exists, if not create
            User user = userRepository.findByEmail(email).orElseGet(() -> createNewUser(email, name, picture));

            // Generate JWT token
            String jwtToken = jwtService.generateToken(user.getEmail());
            
            return new LoginResponse("Login Success", jwtToken, user.getEmail());

        } catch (Exception e) {
            throw new RuntimeException("Google login failed: " + e.getMessage());
        }
    }

    private Map<String, Object> decodeGoogleToken(String googleToken) throws Exception {

        // Simple JWT decode (without full verification for now)
        String[] parts = googleToken.split("\\.");
        
        if (parts.length != 3) {
            throw new RuntimeException("Invalid token format");
        }

        // Decode payload
        String payload = parts[1];
        byte[] decodedBytes = java.util.Base64.getUrlDecoder().decode(payload);
        String decodedString = new String(decodedBytes);

        // Parse JSON
        com.fasterxml.jackson.databind.ObjectMapper mapper =  new com.fasterxml.jackson.databind.ObjectMapper();
        
        @SuppressWarnings("unchecked")
        Map<String, Object> claims = mapper.readValue(decodedString, Map.class);

        return claims;
    }

    private User createNewUser(String email, String name, String picture) {
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setName(name);
        // newUser.setPicture(picture);
        // Set random password since it's OAuth
        newUser.setPassword(passwordEncoder.encode(java.util.UUID.randomUUID().toString()));
        
        return userRepository.save(newUser);
    }
} 