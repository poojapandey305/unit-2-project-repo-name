package com.urbanspice.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;  //

    private String name;
    private double price;
    private String category;
    private String image;

   //Entity relationship
    // one menuItem can appear in many cartItems
    @OneToMany(mappedBy= "menuItem", cascade = CascadeType.ALL,orphanRemoval = true)

   private List<CartItem> cartItems;
   //default constructor
    public MenuItem() {
    }

    // constructor
    public MenuItem(String name, double price, String category,String image) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.image= image;
    }

    // Getters and Setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<CartItem> getCartItems(){return cartItems;}

    public void setCartItems(List<CartItem>cartItems){this.cartItems =cartItems;}
}