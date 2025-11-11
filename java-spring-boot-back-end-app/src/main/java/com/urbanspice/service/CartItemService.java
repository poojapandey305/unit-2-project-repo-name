package com.urbanspice.service;

import com.urbanspice.model.CartItem;
import com.urbanspice.repository.CartItemRepository;
import com.urbanspice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap; //

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    //for getting cartItem with cartId
    public List<CartItem> getCartItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartCartId(cartId);
    }
    // for getting all the cartItem without cartId
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    // Method to return only totalAmount without itemList.
    public double calculateCartTotal(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartCartId(cartId);
        double total = 0.0;
        for (CartItem item : cartItems) {
            total += item.getItemTotal();
        }
        return total;
    }



    //method to get total with itemList (used by /cart/{cartId}/withTotal in controller)
    public Map<String, Object> getCartWithTotal(Long cartId) {
        List<CartItem> items = cartItemRepository.findByCartCartId(cartId);
        double total = 0.0;
        for (CartItem item : items) {
            total += item.getItemTotal();
        }
        Map<String, Object> result = new HashMap<>();
        result.put("cartItems", items);
        result.put("cartTotal", total);
        return result;
    }

    // method to remove cartItem
    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
// Method for clearing the cart
    public void clearCart(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartCartId(cartId);
        cartItemRepository.deleteAll(cartItems);
    }
}