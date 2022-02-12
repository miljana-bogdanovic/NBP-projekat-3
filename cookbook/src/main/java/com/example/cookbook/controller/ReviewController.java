package com.example.cookbook.controller;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.Review;
import com.example.cookbook.service.RecipeService;
import com.example.cookbook.service.ReviewService;
import com.example.cookbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/reviews/user/{id}")
    public ResponseEntity<List<Review>> getByUserId(@PathVariable("id") String id) {
        List<Review> reviews=reviewService.findAllByUser(id);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
    @GetMapping("/reviews/recipe/{id}")
    public ResponseEntity<List<Review>> getByRecipeId(@PathVariable("id") String id) {
        List<Review> reviews = reviewService.findByRecipe(id);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/reviews/{id}")
    public ResponseEntity<Review> createReview(@PathVariable("id") String id,@RequestBody Review review) {
        try {
            Review review1 = reviewService.createReview(new Review(review.getContent(), review.getGrade(), review.getUserId(), review.getRecipeId(), review.getRecipeName(), review.getRecipeAuthor(), review.getRecipePhoto()), id);
            return new ResponseEntity<>(review1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reviews/{id}/recipe/{recipeId}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable("id") String id, @PathVariable("recipeId") String recipeId) {
        try {
            reviewService.deleteById(id, recipeId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
