package com.luv2code.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
}
