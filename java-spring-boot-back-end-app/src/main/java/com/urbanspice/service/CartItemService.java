package com.urbanspice.service;

import com.urbanspice.model.Cart;
import com.urbanspice.model.CartItem;
import com.urbanspice.repository.CartItemRepository;
import com.urbanspice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    // Get all CartItems for a specific Cart
    public List<CartItem> getCartItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartCartId(cartId);
    }

    // For calculating total for all items in a specific Cart
    public double calculateCartTotal(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartCartId(cartId);
        double total = 0.0;
        for (CartItem item : cartItems) {
            total += item.getItemTotal();
        }
        return total;
    }

    // to remove a single CartItem from a Cart
    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    // Delete all CartItems belonging to a specific Cart (used after placing order)
    public void clearCart(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartCartId(cartId);
        cartItemRepository.deleteAll(cartItems);
    }
}

