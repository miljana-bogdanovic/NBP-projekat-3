package com.example.cookbook.model;

import lombok.*;
import org.springframework.data.annotation.Id;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ingredient {
    private String name;
    private Float amount;
    private Unit unit;
}
