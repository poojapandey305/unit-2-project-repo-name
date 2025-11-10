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

    @Autowired private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private MenuItemRepository menuItemRepository;

    public List<Cart> getAllCarts() { return cartRepository.findAll(); }

    public Optional<Cart> getCartById(Long id) { return cartRepository.findById(id); }

    public Cart addItemToCart(Long cartId, Long menuItemId, int quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        CartItem cartItem = new CartItem(cart, menuItem, quantity);
        cartItemRepository.save(cartItem);
        cart.getCartItems().add(cartItem);
        double total = cart.getCartItems().stream()
                .mapToDouble(CartItem::getItemTotal).sum();
        cart.setTotalAmount(total);
        return cartRepository.save(cart);
    }

    public void removeItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}