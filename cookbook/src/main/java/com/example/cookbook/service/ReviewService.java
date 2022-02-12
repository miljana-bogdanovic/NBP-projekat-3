package com.example.cookbook.service;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.Review;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Lazy
@Service
public interface ReviewService {
    List<Review> findAll();
    Optional<Review> findById(String id);
    List<Review> findAllByUser(String id);
    Review createReview(Review review, String id);
    Review updateReview(Review review);
    List<Review> findByRecipe(String recipeId);
    void deleteById(String id, String recipeId);
}
