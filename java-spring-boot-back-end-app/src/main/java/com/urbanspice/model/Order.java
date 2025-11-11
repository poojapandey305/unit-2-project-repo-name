package com.urbanspice.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders") // 'order' is a reserved SQL word, so use 'orders'
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    // ---------- RELATIONSHIPS ----------

    // Many orders belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Many orders can use one address
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    // One order can have many order items
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    // One order has one payment
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;

    // ---------- OTHER FIELDS ----------
    private double totalPrice;
    private String status; // e.g., "Pending", "Delivered"

    // ---------- CONSTRUCTORS ----------
    public Order() {}

    public Order(User user, Address address, double totalPrice, String status) {
        this.user = user;
        this.address = address;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    // ---------- GETTERS & SETTERS ----------
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}