package com.luv2code.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;
    private int quantity;
    private BigDecimal unitPrice;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Long productId;
}
