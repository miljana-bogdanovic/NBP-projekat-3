package com.example.cookbook.service.impl;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.Review;
import com.example.cookbook.repository.RecipeRepository;
import com.example.cookbook.service.RecipeService;
import com.example.cookbook.service.ReviewService;
import com.example.cookbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Lazy
@Service
public class RecipeServiceImpl implements RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    @Lazy
    private UserService userService;
    @Autowired
    private ReviewService reviewService;

    @Override
    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    @Override
    public Optional<Recipe> findById(String id) {
        return recipeRepository.findById(id);
    }

    @Override
    public List<Recipe> findByCategory(String category) {
        return recipeRepository.findByCategory(category);
    }

    @Override
    public Recipe createRecipe(Recipe recipe) {

        Recipe r= recipeRepository.save(recipe);
        userService.addRecipeToUser(recipe.getAuthor(),r.getId());
        return r;
    }

    @Override
    public Recipe updateRecipe(Recipe recipe) {
        for (String reviewId : recipe.getReviews()){
            Review r=reviewService.findById(reviewId).get();
            if (r.getRecipeName().compareTo(recipe.getName())!=0)
                r.setRecipeName(recipe.getName());
            if (r.getRecipePhoto().compareTo(recipe.getPhoto())!=0)
                r.setRecipePhoto(recipe.getPhoto());
            reviewService.updateReview(r);
        }
        return recipeRepository.save(recipe);
    }

    @Override
    public void deleteById(String id, String idAuthor) {
        recipeRepository.deleteById(id);
        userService.deleteRecipeFromUser(idAuthor, id);
    }

    @Override
    public void addReview(String reviewId, String id) {
        Recipe r=recipeRepository.findById(id).get();
        r.getReviews().add(reviewId);
        recipeRepository.save(r);
    }

    @Override
    public void deleteReview(String id, String recipeId) {
        Recipe r=recipeRepository.findById(recipeId).get();
        r.getReviews().remove(id);
        recipeRepository.save(r);
    }


}
