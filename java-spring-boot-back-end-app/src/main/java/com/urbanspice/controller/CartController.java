package com.urbanspice.controller;

import com.urbanspice.model.Cart;
import com.urbanspice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;
//Retrieving all carts stored in the database.
    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }
// Fetch a specific cart by its ID.(triggered when user opens their shopping cart to see what’s inside. )
    @GetMapping("/{id}")
    public Optional<Cart> getCartById(@PathVariable Long id) {
        return cartService.getCartById(id);
    }
//for Adding a menu item to a user's existing cart(this method triggers when a user clicks "Add to Cart")
    @PostMapping("/{cartId}/addItem/{menuItemId}")
    public Cart addItemToCart(@PathVariable Long cartId,
                              @PathVariable Long menuItemId,
                              @RequestParam int quantity) {
        return cartService.addItemToCart(cartId, menuItemId, quantity);
    }
    // Fetch or create a cart for a specific user
    @GetMapping("/user/{userId}")
    public Cart getOrCreateCartByUser(@PathVariable Long userId) {
        return cartService.getOrCreateCart(userId);
    }
//to show total price dynamically
    @GetMapping("/{cartId}/total")
    public double getCartTotal(@PathVariable Long cartId) {
        return cartService.calculateTotal(cartId);
    }

    //for Removing a specific item from a user's cart.
    @DeleteMapping("/removeItem/{cartItemId}")
    public String removeItem(@PathVariable Long cartItemId) {
        cartService.removeItem(cartItemId);
        return "Item removed successfully!";
    }


}





