package com.example.cookbook.service.impl;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.User;
import com.example.cookbook.repository.UserRepository;
import com.example.cookbook.service.RecipeService;
import com.example.cookbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Lazy
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private RecipeService recipeService;

    @Autowired
    private PasswordEncoder encoder;

    public UserServiceImpl() {
    }


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User createUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(String id) {
       userRepository.deleteById(id);
    }

    @Override
    public void addRecipeToUser(String username, String recipeId) {
        Optional<User> user = userRepository.findByUsername(username);
        User user1=user.get();
       user1.getRecipes().add(recipeId);
       userRepository.save(user1);

    }

    @Override
    public void deleteRecipeFromUser(String id, String recipeId) {
        Optional<User> user = userRepository.findById(id);
        User user1=user.get();
        user1.getRecipes().removeIf(r->r.equals(recipeId));
        userRepository.save(user1);

    }

    @Override
    public void addFavouriteToUser(String id, String recipeId) {
        User user = userRepository.findById(id).get();
        user.getFavourites().add(recipeId);
        userRepository.save(user);
    }

    @Override
    public void deleteFavouriteFromUser(String id, String recipeId) {
        Optional<User> user = userRepository.findById(id);
        User user1=user.get();
        //user1.getFavourites().stream().filter(r->r.getId().equals(recipeId));
        user1.getFavourites().removeIf(r->r.equals(recipeId));
        userRepository.save(user1);
    }


    @Override
    public List<Recipe> getUserFavourites(String id) {

        Optional<User> user = userRepository.findById(id);
        ArrayList<Recipe> recipes = new ArrayList<>();
        if (user.isPresent()) {
            for (String r : user.get().getFavourites())
            {
                String id1=r.toString();
                recipes.add(recipeService.findById(id1).get());
            }

        }
        return recipes;
    }

    @Override
    public List<Recipe> getUserRecipes(String id) {
        Optional<User> user = findById(id);
        ArrayList<Recipe> recipes = new ArrayList<>();
        if (user.isPresent()) {
            for (String r : user.get().getRecipes())
                recipes.add(recipeService.findById(r).get());
        }
        return recipes;
    }

    @Override
    public User login(String id, String password) {
        Optional<User> UserData = userRepository.findByUsername(id);
        if (UserData.isPresent()) {
            if (encoder.matches(password, UserData.get().getPassword())) {
                return UserData.get();
            }
        }
        else

            return null;

        return null;
    }
}
