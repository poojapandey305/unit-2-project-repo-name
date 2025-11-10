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
@CrossOrigin(origins = "http://localhost:5174")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{id}")
    public Optional<Cart> getCartById(@PathVariable Long id) {
        return cartService.getCartById(id);
    }

    @PostMapping("/{cartId}/addItem/{menuItemId}")
    public Cart addItemToCart(@PathVariable Long cartId,
                              @PathVariable Long menuItemId,
                              @RequestParam int quantity) {
        return cartService.addItemToCart(cartId, menuItemId, quantity);
    }

    @DeleteMapping("/removeItem/{cartItemId}")
    public void removeItem(@PathVariable Long cartItemId) {
        cartService.removeItem(cartItemId);
    }
}


}


