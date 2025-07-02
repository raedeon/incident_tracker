// This file defines the Ticket entity and maps it to a table in the PostgreSQL database.

package io.github.raedeon.incidenttracker.model; // Declares this file's package

import jakarta.persistence.*; // Imports JPA annotations
import java.time.LocalDate; // Imports LocalDate for date handling

@Entity // Marks this class as a JPA entity to be persisted in the database
public class Ticket {

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented by the database
    private Long id; // Primary key (auto-generated)

    private String ticketId; // Custom ticket identifier (not primary key)
    private String module; // Module name
    private LocalDate dateLogged; // Date ticket was logged
    private int daysToSla; // Days left before SLA breach
    private String status; // Ticket status (e.g., Open, Closed)
    private LocalDate dayClosed; // When the ticket was closed
    private LocalDate breachedDate; // Date of SLA breach, if any
    private String breachReason; // Reason for SLA breach (nullable)

    // Getters and setters to allow Spring to access private fields

    public Long getId() { return id; }

    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public LocalDate getDateLogged() { return dateLogged; }
    public void setDateLogged(LocalDate dateLogged) { this.dateLogged = dateLogged; }

    public int getDaysToSla() { return daysToSla; }
    public void setDaysToSla(int daysToSla) { this.daysToSla = daysToSla; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getDayClosed() { return dayClosed; }
    public void setDayClosed(LocalDate dayClosed) { this.dayClosed = dayClosed; }

    public LocalDate getBreachedDate() { return breachedDate; }
    public void setBreachedDate(LocalDate breachedDate) { this.breachedDate = breachedDate; }

    public String getBreachReason() { return breachReason; }
    public void setBreachReason(String breachReason) { this.breachReason = breachReason; }
}
