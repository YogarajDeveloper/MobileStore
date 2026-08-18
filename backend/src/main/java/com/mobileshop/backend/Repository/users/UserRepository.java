package com.mobileshop.backend.Repository.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mobileshop.backend.Entity.User.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
