package com.example.cookbook.repository;

import com.example.cookbook.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    @Query("{ 'userId' : ?0 }")
    List<Review> findByUserId(String userID);
}
