package com.urbanspice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    private int quantity;
    private double itemTotal;

    // Each CartItem belongs to one Cart
    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonBackReference("cart-cartItems")
    private Cart cart;

    // Each CartItem refers to one MenuItem
    @ManyToOne
    @JoinColumn(name = "menu_item_id")
    private MenuItem menuItem;

    // Default constructor
    public CartItem() {}

    // Constructor for quick creation
    public CartItem(Cart cart, MenuItem menuItem, int quantity, double itemTotal) {
        this.cart = cart;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.itemTotal = itemTotal;
    }

    // Getters and setters
    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getItemTotal() {
        return itemTotal;
    }

    public void setItemTotal(double itemTotal) {
        this.itemTotal = itemTotal;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }
}
