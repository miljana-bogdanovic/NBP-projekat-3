package com.example.cookbook.controller;

import com.example.cookbook.model.Recipe;
import com.example.cookbook.model.User;
import com.example.cookbook.service.UserService;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> Users;

            Users=userService.findAll();

            if (Users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(Users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        Optional<User> UserData = userService.findById(id);

        if (UserData!=null) {
            return new ResponseEntity<>(UserData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        Optional<User> UserData = userService.findByUsername(username);

        if (UserData!=null) {
            return new ResponseEntity<>(UserData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/users/{id}/favourite")
    public ResponseEntity<List<Recipe>> getUserFavourites(@PathVariable("id") String id) {
        List<Recipe> recipes = userService.getUserFavourites(id);
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @GetMapping("/users/{id}/recipes")
    public ResponseEntity<List<Recipe>> getUserRecipes(@PathVariable("id") String id) {
        List<Recipe> recipes = userService.getUserRecipes(id);
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }


    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User User) {
        try {
            User User1 = userService.createUser(new User(User.getUsername(), User.getName(), User.getLastName(), User.getPhoto(), User.getPassword()));
            return new ResponseEntity<>(User1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users/{id}/favourite/{recipeId}")
    public void addToFavourites(@PathVariable("id") String id,@PathVariable("recipeId") String recipeId) {
        userService.addFavouriteToUser(id, recipeId);
    }

    @PutMapping("/users/{id}/favourite/{recipeId}")
    public void deleteFromFavourites(@PathVariable("id") String id,@PathVariable("recipeId") String recipeId) {
        userService.deleteFavouriteFromUser(id, recipeId);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User User) {
        Optional<User> UserData = userService.findById(id);

        if (UserData.isPresent()) {
            User user1 = UserData.get();
            user1.setName(User.getName());
            user1.setLastName(User.getLastName());
            return new ResponseEntity(userService.updateUser(user1), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
//
//    @DeleteMapping("/users/{id}")
//    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String id) {
//        try {
//            userService.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

/*    @DeleteMapping("/Users")
    public ResponseEntity<HttpStatus> deleteAllTUsers() {
        try {
            userService.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    @PostMapping("/login")
    public ResponseEntity<User> logIn(@RequestBody UserLogDetails user) {
        User user1= userService.login(user.username, user.password);
        if(user1!=null) {
            return new ResponseEntity<>(user1, HttpStatus.OK);
        } else
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public static class UserLogDetails {

    private String username;
    private String password;
}
}
