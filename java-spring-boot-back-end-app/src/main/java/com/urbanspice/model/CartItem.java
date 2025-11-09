package com.urbanspice.model;

import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "cart_item_id")
    private Long cartItemId;

    //entity relationship
    // many items can belong to one cart
    @ManyToOne
    @JoinColumn(name= "cart_id")
    private Cart cart;
    //many cart item can refer to one menuItem
    @ManyToOne
    @JoinColumn(name="item_id")
    private MenuItem menuItem;


   private int quantity;

    public CartItem() {}

    public CartItem(Cart cart,MenuItem menuItem, int quantity) {
        this.cart = cart;
        this.menuItem = menuItem;
        this.quantity = quantity;
    }

    // Getters & Setters
    public Long getCartItemId() { return cartItemId; }
    public void setCartItemId(Long cartItemId) { this.cartItemId = cartItemId; }

    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }

    public MenuItem getMenuItem() { return menuItem; }
    public void setMenuItem(MenuItem menuItem) { this.menuItem = menuItem; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}

