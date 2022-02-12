package com.example.cookbook.service;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.Review;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Lazy
@Service
public interface RecipeService {
List<Recipe> findAll();
Optional<Recipe> findById(String id);
List<Recipe> findByCategory(String category);
Recipe createRecipe(Recipe recipe);
Recipe updateRecipe(Recipe recipe);
void deleteById(String id, String idAuthor);
void addReview(String reviewId, String id);
void deleteReview(String id, String recipeId);
}
