package com.luv2code.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;
    private String name;

    @OneToMany(mappedBy = "country")
    private List<State> states;
}
