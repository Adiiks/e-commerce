package com.luv2code.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderTrackingNumber;
    private BigDecimal totalPrice;
    private int totalQuantity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address_id")
    private Address billingAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id")
    private Address shippingAddress;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String status;

    @CreationTimestamp
    private Date dateCreated;

    @UpdateTimestamp
    private Date lastUpdated;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems = new HashSet<>();

    public void addOrderItem(OrderItem orderItem) {
        if (orderItem != null) {
            this.orderItems.add(orderItem);
            orderItem.setOrder(this);
        }
    }
}
