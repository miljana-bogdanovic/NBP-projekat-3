package com.example.cookbook.controller;


import com.example.cookbook.model.Recipe;
import com.example.cookbook.service.RecipeService;
import com.example.cookbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class RecipeController {

    @Autowired
    private RecipeService RecipeService;

    @GetMapping("/recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes()  {
        try {
            List<Recipe> recipes;

            recipes=RecipeService.findAll();

            if (recipes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(recipes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/recipes/category/{category}")
    public ResponseEntity<List<Recipe>> findByCategory(@PathVariable(required = true) String category) {
        try {
            List<Recipe> recipes;
            recipes = new ArrayList<Recipe>();

            recipes=RecipeService.findByCategory(category);

            return new ResponseEntity<>(recipes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/recipes/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable("id") String id) {
        Optional<Recipe> recipeData = RecipeService.findById(id);

        if (recipeData.isPresent()) {
            return new ResponseEntity<>(recipeData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/recipes")
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        try {
            Recipe recipe1 = RecipeService.createRecipe(new Recipe(recipe.getName(), recipe.getCategory(), recipe.getPhoto(),recipe.getAuthor(), recipe.getDescription(), recipe.getIngredients()));

            return new ResponseEntity<>(recipe1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/recipes/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable("id") String id, @RequestBody Recipe recipe) {
        Optional<Recipe> recipeData = RecipeService.findById(id);

        if (recipeData.isPresent()) {
            Recipe recipe1 = recipeData.get();
            recipe1.setName(recipe.getName());
            recipe1.setCategory(recipe.getCategory());
            recipe1.setDescription(recipe.getDescription());
            recipe1.setIngredients(recipe.getIngredients());
            recipe1.setReviews(recipe.getReviews());
            recipe1.setPhoto(recipe.getPhoto());
            RecipeService.updateRecipe(recipe1);
            //userService.updateRecipeInfo(recipe1);
            return new ResponseEntity("Recipe updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/recipes/{id}/author/{idAuthor}")
    public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable("id") String id, @PathVariable("idAuthor") String idAuthor) {
        try {
            RecipeService.deleteById(id, idAuthor);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

/*    @DeleteMapping("/recipes")
    public ResponseEntity<HttpStatus> deleteAllTRecipes() {
        try {
            RecipeService.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

}
