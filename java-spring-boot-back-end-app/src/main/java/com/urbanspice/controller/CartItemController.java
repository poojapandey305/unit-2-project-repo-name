package com.urbanspice.controller;

import com.urbanspice.model.CartItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cartitems")
public class CartItemController {

    private List<CartItem> cartItems = new ArrayList<>();
    private Long nextId = 1L;

    // GET all cart items
    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItems;
    }

    // POST create new cart item
    @PostMapping
    public CartItem createCartItem(@RequestBody CartItem newItem) {
        newItem.setCartItemId(nextId++);
        cartItems.add(newItem);
        return newItem;
    }
    // GET a single cart item by ID — rewritten without stream
    @GetMapping("/{id}")
    public CartItem getCartItemById(@PathVariable Long id) {
        for (CartItem item : cartItems) {
            if (item.getCartItemId().equals(id)) {
                return item;
            }
        }
        return null; // if not found
    }




    // DELETE a cart item by ID
    @DeleteMapping("/{id}")
    public String deleteCartItem(@PathVariable Long id) {
        cartItems.removeIf(item -> item.getCartItemId().equals(id));
        return "CartItem with ID " + id + " deleted successfully.";
    }
}