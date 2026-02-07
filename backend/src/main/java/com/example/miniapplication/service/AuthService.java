package com.example.miniapplication.service;

import com.example.miniapplication.dto.JwtResponse;
import com.example.miniapplication.dto.LoginRequest;
import com.example.miniapplication.dto.RegisterRequest;
import com.example.miniapplication.entity.User;
import com.example.miniapplication.repository.UserRepository;
import com.example.miniapplication.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.Period;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        System.out.println("Attempting authentication for email: " + loginRequest.getEmail());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateJwtToken(authentication);

            User userDetails = (User) authentication.getPrincipal();
            
            System.out.println("Authentication successful for user: " + userDetails.getEmail());
            
            return new JwtResponse(jwt, 
                                 userDetails.getId(), 
                                 userDetails.getUsername(),
                                 userDetails.getEmail(),
                                 userDetails.getFirstName(),
                                 userDetails.getLastName());
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public User registerUser(RegisterRequest signUpRequest) {
        // Check if email already exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        // Check if student ID already exists
        if (userRepository.existsByStudentId(signUpRequest.getStudentId())) {
            throw new RuntimeException("Student ID is already registered!");
        }

        // Validate birthdate (must be at least 13 years old)
        if (signUpRequest.getBirthdate() != null) {
            LocalDate today = LocalDate.now();
            Period age = Period.between(signUpRequest.getBirthdate(), today);
            if (age.getYears() < 13) {
                throw new RuntimeException("You must be at least 13 years old to register!");
            }
            if (age.getYears() > 120) {
                throw new RuntimeException("Please enter a valid birthdate!");
            }
        }

        // Additional password validation
        String password = signUpRequest.getPassword();
        if (password != null) {
            if (!password.matches(".*[a-z].*")) {
                throw new RuntimeException("Password must contain at least one lowercase letter!");
            }
            if (!password.matches(".*[A-Z].*")) {
                throw new RuntimeException("Password must contain at least one uppercase letter!");
            }
            if (!password.matches(".*\\d.*")) {
                throw new RuntimeException("Password must contain at least one number!");
            }
        }

        // Create new user's account
        User user = new User(signUpRequest.getStudentId(),
                           signUpRequest.getFirstName(),
                           signUpRequest.getLastName(),
                           signUpRequest.getEmail(),
                           signUpRequest.getBirthdate(),
                           encoder.encode(signUpRequest.getPassword()));

        return userRepository.save(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }
        throw new RuntimeException("User not authenticated");
    }
}
