package com.example.cookbook.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "reviews")
public class Review {
    private String id;
    private String content;
    private Integer grade;
    @Indexed
    private String userId;
    private String recipeId;
    private String recipeName;
    private  String recipeAuthor;
    private String recipePhoto;


    public Review(String content, Integer grade, String userId, String recipeId,  String recipeName, String recipeAuthor, String recipePhoto) {
        this.content = content;
        this.grade = grade;
        this.userId = userId;
        this.recipeId=recipeId;
        this.recipeName = recipeName;
        this.recipeAuthor = recipeAuthor;
        this.recipePhoto = recipePhoto;
    }

}
