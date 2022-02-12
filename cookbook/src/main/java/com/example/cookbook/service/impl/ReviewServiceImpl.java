package com.example.cookbook.service.impl;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.Review;
import com.example.cookbook.repository.ReviewRepository;
import com.example.cookbook.service.RecipeService;
import com.example.cookbook.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    @Lazy
    private RecipeService recipeService;
    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Optional<Review> findById(String id) {
        return  reviewRepository.findById(id);
    }

    @Override
    public List<Review> findAllByUser(String id) {
        return reviewRepository.findByUserId(id);
    }

    @Override
    public Review createReview(Review review, String id) {
        Review review1= reviewRepository.save(review);
        this.recipeService.addReview(review1.getId(), id);
        return review1;
    }

    @Override
    public Review updateReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> findByRecipe(String recipeId) {
        Optional<Recipe> recipeData = recipeService.findById(recipeId);
        List<Review> reviews = new ArrayList<>();
        if (recipeData.isPresent()) {
            for (String reviewId : recipeData.get().getReviews())
                reviews.add(reviewRepository.findById(reviewId).get());

        }
        return reviews;
    }

    @Override
    public void deleteById(String id, String recipeId) {
        recipeService.deleteReview(id, recipeId);
         reviewRepository.deleteById(id);
    }
}
