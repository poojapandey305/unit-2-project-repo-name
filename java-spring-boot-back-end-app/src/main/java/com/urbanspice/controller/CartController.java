package com.urbanspice.controller;

import com.urbanspice.model.Cart;
import com.urbanspice.model.CartItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private List<Cart> carts = new ArrayList<>(); // temporary in-memory list
    private Long nextId = 1L;                     // simple ID counter for testing

    // GET all carts
    @GetMapping
    public List<Cart> getAllCarts() {
        return carts;
    }

    // POST create new cart
    @PostMapping
    public Cart createCart(@RequestBody Cart newCart) {
        newCart.setCartId(nextId++);
        carts.add(newCart);
        return newCart;
    }

    // GET single cart by ID
    @GetMapping("/{id}")
    public Cart getCartById(@PathVariable Long id) {
        return carts.stream()
                .filter(c -> c.getCartId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // DELETE cart by ID
    @DeleteMapping("/{id}")
    public String deleteCart(@PathVariable Long id) {
        carts.removeIf(c -> c.getCartId().equals(id));
        return "Cart with ID " + id + " deleted successfully.";
    }
}