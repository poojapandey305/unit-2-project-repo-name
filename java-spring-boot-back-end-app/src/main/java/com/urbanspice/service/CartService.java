package com.urbanspice.service;

import com.urbanspice.model.Cart;
import com.urbanspice.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public List<Cart> getCartsByUserId(Long userId) {
        return cartRepository.findByUserUserId(userId);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}