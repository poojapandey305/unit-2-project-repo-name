package com.urbanspice.controller;

import com.urbanspice.model.OrderItem;
import com.urbanspice.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orderitems")
@CrossOrigin(origins = "http://localhost:5174")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;
// Method to save a orderItem
    @PostMapping
    public OrderItem createOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.saveOrderItem(orderItem);
    }
//To get the list of all orderItems
    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }
// To fetch one orderItem by id
    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id);
    }
 // To delete orderItem by id
    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
    }
}
