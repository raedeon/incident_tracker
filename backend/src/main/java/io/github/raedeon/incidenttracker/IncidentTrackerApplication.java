// This is the entry point for the Spring Boot backend application.

package io.github.raedeon.incidenttracker;  // Defines the package location of this class

import org.springframework.boot.SpringApplication; // Imports SpringApplication to run the app
import org.springframework.boot.autoconfigure.SpringBootApplication; // Enables auto-configuration
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication  // Tells Spring Boot to start scanning components in this package
@EntityScan("io.github.raedeon.incidenttracker.model")
@EnableMethodSecurity(prePostEnabled=true)
public class IncidentTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(IncidentTrackerApplication.class, args); // Launches the Spring Boot app
    }
}