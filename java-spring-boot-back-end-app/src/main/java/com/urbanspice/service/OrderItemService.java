package com.urbanspice.service;

import com.urbanspice.model.OrderItem;
import com.urbanspice.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;
    //Method to save new order to the database

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
// To retrieve a list of orderItems
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }
//To fetch a single orderItem by Id
    public OrderItem getOrderItemById(Long id) {
        return orderItemRepository.findById(id).orElse(null);
    }
//To delete a orderItem by Id
    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}