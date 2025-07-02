// This is the entry point for the Spring Boot backend application.

package io.github.raedeon.incidenttracker;  // Defines the package location of this class

import org.springframework.boot.SpringApplication; // Imports SpringApplication to run the app
import org.springframework.boot.autoconfigure.SpringBootApplication; // Enables auto-configuration

@SpringBootApplication  // Tells Spring Boot to start scanning components in this package
public class IncidentTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(IncidentTrackerApplication.class, args); // Launches the Spring Boot app
    }
}