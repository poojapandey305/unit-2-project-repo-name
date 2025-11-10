package com.urbanspice.service;
import com.urbanspice.model.Cart;
import com.urbanspice.repository.CartRepository;
import com.urbanspice.model.CartItem;
import com.urbanspice.model.MenuItem;
import com.urbanspice.repository.CartItemRepository;
import com.urbanspice.repository.CartRepository;
import com.urbanspice.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    // Injecting all the repositories needed for Cart operations
    @Autowired private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private MenuItemRepository menuItemRepository;
//to fetch all cart from the database
    public List<Cart> getAllCarts() { return cartRepository.findAll(); }
//to fetch a single cart by id
    public Optional<Cart> getCartById(Long id) { return cartRepository.findById(id); }
//Adding a menuItem to existing cart
    // step 1-getting the existing cart by id
    public Cart addItemToCart(Long cartId, Long menuItemId, int quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        //step2- getting the menuItem user wants to add.
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        //creating a new cartItem(one cartItem represents one menuItem)
        CartItem cartItem = new CartItem(cart, menuItem, quantity);
        //step4- saving the cart item
        cartItemRepository.save(cartItem);
        //step 5-adding the new cartItem to cart's list of item
        cart.getCartItems().add(cartItem);
        // step 6 - recalculate total cost of cart using all items
        double total = cart.getCartItems().stream()
                .mapToDouble(CartItem::getItemTotal).sum();
        cart.setTotalAmount(total);
        //step7- save and return the updated cart
        return cartRepository.save(cart);
    }
//to remove specific cartItem
    public void removeItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}