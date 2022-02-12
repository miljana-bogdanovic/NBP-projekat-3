package com.example.cookbook.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "recipes")
public class Recipe {
    @Id
    private String id;
    private String name;
    @Indexed
    private String category;
    private String photo;
    private String author;
    private String description;
    private List<Ingredient> ingredients = new ArrayList<>();
    //IDs
    private List<String> reviews = new ArrayList<>();

    public Recipe(String name, String category, String photo, String author, String description, List<Ingredient> ingredients) {
        this.name = name;
        this.category = category;
        this.photo = photo;
        this.author = author;
        this.description = description;
        this.ingredients = ingredients;
        this.reviews=new ArrayList<>();
    }

}
