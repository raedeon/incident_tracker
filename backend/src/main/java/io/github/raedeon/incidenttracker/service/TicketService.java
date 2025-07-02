package io.github.raedeon.incidenttracker.service; // Declares package

import org.springframework.beans.factory.annotation.Autowired; // Enables dependency injection
import org.springframework.stereotype.Service; // Marks this class as a service bean
import io.github.raedeon.incidenttracker.model.Ticket; // Imports the Ticket entity
import io.github.raedeon.incidenttracker.repository.TicketRepository; // Imports the repository interface

import java.time.LocalDate; // Used to get current date
import java.time.temporal.ChronoUnit; // Used for calculating days between dates
import java.util.*; // For List, Map, HashMap
import java.util.stream.Collectors; // Used for stream operations

@Service // Registers this class as a Spring service bean
public class TicketService {

    @Autowired // Automatically injects the TicketRepository bean
    private TicketRepository repo;

    // Fetch all tickets and recalculate daysToSla on-the-fly
    public List<Ticket> getAllTickets() {
        List<Ticket> tickets = repo.findAll();

        // Recalculate daysToSla for all tickets
        for (Ticket t : tickets) {
            int daysToSla = 5 - (int) ChronoUnit.DAYS.between(t.getDateLogged(), LocalDate.now());
            t.setDaysToSla(daysToSla);

            // If daysToSla is negative and status is "Open", set breachedDate to today
            if (t.getBreachedDate() == null && daysToSla < 0 && t.getStatus().equals("Open")) {
                t.setBreachedDate(LocalDate.now()); // Set breached month
            }
        }

        return tickets;
    }

    // Add a new ticket
    public Ticket addTicket(Ticket ticket) {
        // Use today as fallback if no date is provided
        LocalDate dateLogged = (ticket.getDateLogged() != null)
                ? ticket.getDateLogged()
                : LocalDate.now();
        ticket.setDateLogged(dateLogged);

        // Calculate daysToSla from dateLogged
        int daysToSla = 5 - (int) ChronoUnit.DAYS.between(dateLogged, LocalDate.now());
        ticket.setDaysToSla(daysToSla);

        if (daysToSla < 0) {
            ticket.setBreachedDate(LocalDate.now()); // Set breached month
        }

        ticket.setStatus("Open"); // Default status

        return repo.save(ticket); // Saves the new ticket
    }

    // Close a ticket by ID and set closure date
    public Ticket closeTicket(String ticketId, String closeDateStr) {
        Ticket ticket = repo.findByTicketId(ticketId).orElseThrow(); // Finds ticket or throws 404
        ticket.setStatus("Closed"); // Updates status

        // Parse the closeDate string (e.g. "2025-06-18")
        LocalDate closeDate = closeDateStr != null ? LocalDate.parse(closeDateStr) : LocalDate.now();
        ticket.setDayClosed(closeDate); // Sets closure date

        return repo.save(ticket); // Saves the update
    }

    // Update breach reason for a specific ticket
    public Ticket updateBreachReason(String ticketId, String reason) {
        Ticket ticket = repo.findByTicketId(ticketId).orElseThrow(); // Finds ticket or throws 404
        ticket.setBreachReason(reason.replaceAll("\"", "")); // Clean string input
        return repo.save(ticket); // Saves the update
    }

    // Reopen a ticket by ID
    public Ticket reopenTicket(String ticketId) {
        Ticket ticket = repo.findByTicketId(ticketId).orElseThrow(); // Finds ticket or throws 404
        ticket.setStatus("Open"); // Updates status to Open
        ticket.setDayClosed(null); // Clears closure date
        ticket.setBreachedDate(null); // Clears breached date
        ticket.setBreachReason(null); // Clears breach reason
        return repo.save(ticket); // Saves the update
    }

    // Delete a ticket by ID and module
    public void deleteTicket(String module, String ticketId) {
        repo.deleteByTicketIdAndModule(ticketId, module); // Deletes using composite key
    }

    // Helper: Convert raw query results into { label, count } maps
    private List<Map<String, Object>> convertToLabelCount(List<Object[]> raw) {
        return raw.stream().map(row -> {
            Map<String, Object> map = new HashMap<>();
            map.put("label", row[0]);
            map.put("count", row[1]);
            return map;
        }).collect(Collectors.toList());
    }

    // Get incident statistics grouped by daily, weekly, or monthly
    public Map<String, List<Map<String, Object>>> getIncidentStats(String range) {
        String format;
        switch (range.toLowerCase()) {
            case "daily":
                format = "YYYY-MM-DD";
                break;
            case "weekly":
                format = "IYYY-IW"; // ISO Year + Week
                break;
            case "monthly":
                format = "YYYY-MM";
                break;
            default:
                throw new IllegalArgumentException("Invalid range: " + range);
        }

        // Call custom SQL aggregate functions and format response
        Map<String, List<Map<String, Object>>> result = new HashMap<>();
        result.put("Raised", convertToLabelCount(repo.countRaisedBy(format)));
        result.put("Open", convertToLabelCount(repo.countOpenBy(format)));
        result.put("Closed", convertToLabelCount(repo.countClosedBy(format)));
        result.put("Breached", convertToLabelCount(repo.countBreachedBy(format)));

        return result;
    }
}
