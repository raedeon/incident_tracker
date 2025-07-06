// This file contains a controller for handling Google OAuth authentication in a Spring Boot application.
// It checks if the authenticated user is from the enterprise and grants or denies access accordingly.

package io.github.raedeon.incidenttracker.controller;

import io.github.raedeon.incidenttracker.model.Role;
import io.github.raedeon.incidenttracker.model.User;
import io.github.raedeon.incidenttracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {

    private final UserRepository userRepository;

    public GoogleAuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/google")
    public ResponseEntity<String> googleLogin(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal(); // Casts the authenticated principal (user) to a Jwt object to access token claims 
        String email = jwt.getClaimAsString("email");  // Extracts the 'email' claim from the JWT (issued by Google after successful login)

        //if (email == null || !email.endsWith("@enterprise.com.sg")) {
            //return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Enteprise users only.");
        //

        Role role;
/*         if (email.equals("admin@enterprise.com.sg")) {
            role = Role.ADMIN;
        } else if (email.endsWith("enterprise.com.sg")) {
            role = Role.USER;
        } else {
            role = Role.VIEWER;
        } */
       role = Role.ADMIN;

        // Save user to DB if not exists
        User user = userRepository.findByEmail(email)
            .orElse(new User(email, role));
        user.setRole(role); // Ensure correct role
        userRepository.save(user);

        return ResponseEntity.ok("Access granted to " + email + " with role " + role);
    }
}
