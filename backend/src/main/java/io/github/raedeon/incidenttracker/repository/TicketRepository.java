// This interface defines database operations for Ticket entities using Spring Data JPA.

package io.github.raedeon.incidenttracker.repository; // Declares the package location

import io.github.raedeon.incidenttracker.model.Ticket; // Imports the Ticket entity
import org.springframework.data.jpa.repository.JpaRepository; // Enables Spring JPA functionality.
import org.springframework.data.jpa.repository.Query; // Imports Query annotation for custom queries
import org.springframework.data.repository.query.Param; // Imports Param for named parameters in queries
import org.springframework.transaction.annotation.Transactional; // Imports Transactional for managing transactions
import org.springframework.data.jpa.repository.Modifying; // Imports Modifying for update/delete operations

import java.util.*; // Imports Object array for custom query results

// TicketRepository inherits CRUD operations from JpaRepository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByTicketId(String ticketId); // Finds a ticket by its custom ID

    // Custom query to delete tickets by module
    @Transactional
    @Modifying
    @Query("DELETE FROM Ticket t WHERE t.ticketId = :ticketId AND t.module = :module")
    void deleteByTicketIdAndModule(@Param("ticketId") String ticketId, @Param("module") String module);

    // Custom query to count tickets raised
    @Query("SELECT TO_CHAR(t.dateLogged, ?1), COUNT(t) FROM Ticket t GROUP BY 1 ORDER BY 1")
    List<Object[]> countRaisedBy(String format);

    // Custom query to count open tickets
    @Query("SELECT TO_CHAR(t.dateLogged, ?1), COUNT(t) FROM Ticket t WHERE t.status = 'Open' GROUP BY 1 ORDER BY 1")
    List<Object[]> countOpenBy(String format);

    // Custom query to count tickets that are closed
    @Query("SELECT TO_CHAR(t.dayClosed, ?1), COUNT(t) FROM Ticket t WHERE t.status = 'Closed' GROUP BY 1 ORDER BY 1")
    List<Object[]> countClosedBy(String format);

    // Custom query to count tickets that have breached SLA or have a breached date
    @Query("SELECT TO_CHAR(t.dateLogged, ?1), COUNT(t) FROM Ticket t WHERE t.daysToSla < 0 OR t.breachedDate IS NOT NULL GROUP BY 1 ORDER BY 1")
    List<Object[]> countBreachedBy(String format);


}
