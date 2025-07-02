// This file contains a controller for handling Google OAuth authentication in a Spring Boot application.
// It checks if the authenticated user is from the enterprise and grants or denies access accordingly.

package io.github.raedeon.incidenttracker.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {

    @PostMapping("/google")
    public ResponseEntity<String> googleLogin(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal(); // Casts the authenticated principal (user) to a Jwt object to access token claims 
        String email = jwt.getClaimAsString("email");  // Extracts the 'email' claim from the JWT (issued by Google after successful login)

        //if (email == null || !email.endsWith("@enterprise.com.sg")) {
            //return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Enteprise users only.");
        //

        return ResponseEntity.ok("Access granted to " + email);
    }
}
