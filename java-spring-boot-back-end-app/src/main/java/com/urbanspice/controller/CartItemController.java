package com.urbanspice.controller;

import com.urbanspice.model.CartItem;
import com.urbanspice.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cartitems")
@CrossOrigin(origins = "http://localhost:5174")
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/cart/test")
    public List<CartItem> testItems() {
        return cartItemService.getAllCartItems();  //
    }

    //  Get all CartItems for a given Cart
    @GetMapping("/cart/{cartId}")
    public List<CartItem> getCartItemsByCartId(@PathVariable Long cartId) {
        return cartItemService.getCartItemsByCartId(cartId);
    }

    // Get the total of all items in the Cart (calculated dynamically)
    @GetMapping("/cart/{cartId}/total")
    public double getCartTotal(@PathVariable Long cartId) {
        return cartItemService.calculateCartTotal(cartId);
    }

    // Delete a single CartItem by its ID
    @DeleteMapping("/{cartItemId}")
    public String removeCartItem(@PathVariable Long cartItemId) {
        cartItemService.removeCartItem(cartItemId);
        return "Cart item removed successfully.";
    }

    // Delete all CartItems in a Cart (used after placing an order)
    @DeleteMapping("/cart/{cartId}/clear")
    public String clearCart(@PathVariable Long cartId) {
        cartItemService.clearCart(cartId);
        return "All items removed from the cart.";
    }
}
