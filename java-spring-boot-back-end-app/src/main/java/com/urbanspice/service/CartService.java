package com.urbanspice.service;

import com.urbanspice.model.Cart;
import com.urbanspice.model.CartItem;
import com.urbanspice.model.MenuItem;
import com.urbanspice.model.User;
import com.urbanspice.repository.CartItemRepository;
import com.urbanspice.repository.CartRepository;
import com.urbanspice.repository.MenuItemRepository;
import com.urbanspice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// connects Cart, CartItem, MenuItem, and User repositories.
@Service
public class CartService {

    @Autowired private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private MenuItemRepository menuItemRepository;
    @Autowired private UserRepository userRepository;

    // method to get all the carts
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    // getting a single cart by its ID
    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    // Method to get or create a cart for a specific user
    // If the user does not have one, a new empty cart is created.
    public Cart getOrCreateCart(Long userId) {
        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Check if a cart already exists for this user
        Cart cart = cartRepository.findByUser_UserId(userId);
        if (cart == null) {
            // Create a new cart for this user
            cart = new Cart(user);
            cart.setCartItems(new ArrayList<>()); // ensure empty list initialized
            cartRepository.save(cart);
        }
        return cart;
    }

    // Method to add a menu item to an existing cart.
    // If the item already exists, update its quantity instead of adding a duplicate.
    public Cart addItemToCart(Long cartId, Long menuItemId, int quantity) {
        // Find existing cart
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with ID: " + cartId));

        // Find menu item to add
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found with ID: " + menuItemId));

        // Check if the item already exists in the cart
        CartItem existingItem = cart.getCartItems().stream()
                .filter(ci -> ci.getMenuItem() != null && ci.getMenuItem().getItemId().equals(menuItemId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            // Update quantity and total
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem.setItemTotal(existingItem.getQuantity() * existingItem.getMenuItem().getPrice());
            cartItemRepository.save(existingItem);
        } else {
            // Create new cart item and add to cart
            double itemTotal = menuItem.getPrice() * quantity;
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setMenuItem(menuItem); // important line for linking
            newItem.setQuantity(quantity);
            newItem.setItemTotal(itemTotal);

            cartItemRepository.save(newItem);

            // Initialize cart list if null
            if (cart.getCartItems() == null) {
                cart.setCartItems(new ArrayList<>());
            }

            cart.getCartItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    // Method to remove a specific item from the cart
    public void removeItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    // Method to calculate the total value of all items in the cart dynamically.
    // It multiplies each item's price × quantity and sums them.
    public double calculateTotal(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with ID: " + cartId));

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) return 0.0;

        return cart.getCartItems().stream()
                .mapToDouble(CartItem::getItemTotal)
                .sum();
    }

    // To update the quantity of an item in the cart
    public Cart updateItemQuantity(Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItem.setQuantity(quantity);
        cartItem.setItemTotal(cartItem.getMenuItem().getPrice() * quantity);
        cartItemRepository.save(cartItem);

        // Return the updated cart
        return cartItem.getCart();
    }
}