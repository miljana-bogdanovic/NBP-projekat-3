package com.example.cookbook.service;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.User;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Lazy
@Service
public interface UserService {
    List<User> findAll();
    Optional<User> findById(String id);
    Optional<User> findByUsername(String username);
    User createUser(User user);
    User updateUser(User user);
    void deleteById(String id);
    void addRecipeToUser(String username, String recipeId);
    void deleteRecipeFromUser(String id,String recipeId);
    void addFavouriteToUser(String id, String recipeId);
    void deleteFavouriteFromUser(String id, String recipeId);
    List<Recipe> getUserFavourites(String id);
    List<Recipe> getUserRecipes(String id);
    User login(String id, String password);
}
