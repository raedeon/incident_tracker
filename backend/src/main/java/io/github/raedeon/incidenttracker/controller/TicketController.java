package io.github.raedeon.incidenttracker.controller; // Declares package

import io.github.raedeon.incidenttracker.model.Ticket; // Imports the Ticket entity
import io.github.raedeon.incidenttracker.service.TicketService; // Imports the service layer
import org.springframework.beans.factory.annotation.Autowired; // Enables dependency injection
import org.springframework.web.bind.annotation.*; // Imports annotations for REST APIs

import java.util.List; // Used for returning lists
import java.util.Map; // Used for request body in update methods

@RestController // Marks this class as a REST controller
@RequestMapping("/api/tickets") // Sets base path for all endpoints
@CrossOrigin(origins = "*") // Allows frontend (e.g., React) to access this API
public class TicketController {

    @Autowired // Automatically injects the TicketService bean
    private TicketService service;

    // GET: Fetch all tickets and recalculate daysToSla on-the-fly
    @GetMapping
    public List<Ticket> getAllTickets() {
        return service.getAllTickets();
    }

    @PostMapping // Handles POST /api/tickets
    public Ticket addTicket(@RequestBody Ticket ticket) {
        return service.addTicket(ticket);
    }

    @PutMapping("/close/{ticketId}") // Handles PUT /api/tickets/close/{id}
    public Ticket closeTicket(@PathVariable String ticketId, @RequestBody Map<String, String> body) {
        return service.closeTicket(ticketId, body.get("closeDate"));
    }

    // PUT: Update breach reason for a specific ticket
    @PutMapping("/breach-reason/{ticketId}")
    public Ticket updateBreachReason(@PathVariable String ticketId, @RequestBody String reason) {
        return service.updateBreachReason(ticketId, reason);
    }

    // PUT: Reopen a ticket by ID
    @PutMapping("/reopen/{ticketId}") // Handles PUT /api/tickets/reopen/{id}
    public Ticket reopenTicket(@PathVariable String ticketId) {
        return service.reopenTicket(ticketId);
    }

    // DELETE: Delete a ticket by ID and module
    @DeleteMapping("/{module}/{ticketId}")
    public void deleteTicket(@PathVariable String module, @PathVariable String ticketId) {
        service.deleteTicket(module, ticketId);
    }

    // GET: Fetch incident statistics
    @GetMapping("/stats")
    public Map<String, List<Map<String, Object>>> getStats(@RequestParam String range) {
        return service.getIncidentStats(range);
    }
}
