// This file handles security configuration for the Spring Boot application, specifically for OAuth2 authentication using JWTs.
// It allows unauthenticated access to the Google login endpoint and secures all other endpoints,

package io.github.raedeon.incidenttracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // Allow this endpoint without auth (Google login callback)
                .requestMatchers("/api/auth/google").permitAll()
                // Require authentication for everything else
                .anyRequest().authenticated()
            )
            // Use JWTs from Authorization header (from Google in this case)
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt()
            );

        return http.build();
    }
}
