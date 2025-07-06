package io.github.raedeon.incidenttracker.model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User() {}

    public User(String email, Role role) {
        this.email = email;
        this.role = role;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}