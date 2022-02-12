package com.example.cookbook.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Component
@Document(collection = "users")
public class User {
    @Id
    private String id;
    @Indexed(unique=true)
    private String username;
    private String name;
    private String lastName;
    private String photo;
    private String password;
    //IDs
    private List<String> recipes=new ArrayList<>();
    //IDs
    private List<String> favourites=new ArrayList<>();

    public User(String username, String name, String lastName, String photo, String password) {
        this.username = username;
        this.name = name;
        this.lastName = lastName;
        this.photo = photo;
        this.password = password;
        this.recipes=new ArrayList<>();
        this.favourites=new ArrayList<>();

    }

}

