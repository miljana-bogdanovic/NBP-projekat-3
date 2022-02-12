package com.example.cookbook.repository;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
