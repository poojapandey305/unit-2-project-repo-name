package com.urbanspice.service;

import com.urbanspice.model.Order;
import com.urbanspice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    // Methods to
    // create or update the order
public Order saveOrder(Order order){
    return orderRepository.save(order);
}
    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    // Delete order
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}


