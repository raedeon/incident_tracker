package io.github.raedeon.incidenttracker.repository;

import io.github.raedeon.incidenttracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String>{
    Optional<User> findByEmail(String email);
}
