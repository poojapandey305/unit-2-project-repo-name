package com.urbanspice.model;

import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "cart_item_id")
    private Long cartItemId;
private Long cartId;
private Long itemId;
private int quantity;

    public CartItem() {}

    public CartItem(Long cartId,Long itemId, int quantity) {
        this.cartId = cartId;
        this.itemId =itemId ;
        this.quantity = quantity;
    }

    // Getters & Setters
    public Long getCartItemId() { return cartItemId; }
    public void setCartItemId(Long cartItemId) { this.cartItemId = cartItemId; }

    public Long getCartId() { return cartId; }
    public void setCartId(Long cartId) { this.cartId = cartId; }

    public Long getItemId() { return itemId; }
    public void setMenuItem(Long menuItem) { this.itemId = itemId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}

