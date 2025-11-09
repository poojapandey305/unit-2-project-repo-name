package com.urbanspice.controller;

import com.urbanspice.model.MenuItem;
import com.urbanspice.repository.MenuItemRepository;
import com.urbanspice.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menuitems")
@CrossOrigin(origins = "http://localhost:5174")
public class MenuItemController {
    @Autowired
    private MenuItemService menuItemService;

    @PostMapping
    public MenuItem createMenuItem(@RequestBody MenuItem menuItem) {
        return menuItemService.createMenuItem(menuItem);
    }

    // getting all the menu items
    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuItemService.getAllMenuItems();
    }

    // getting the menu item by id
    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id) {
        return menuItemService.getMenuItemById(id).orElse(null);
    }

    //updating a menu item
    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id, @RequestBody MenuItem updatedItem) {
        return menuItemService.updateMenuItem(id, updatedItem);
    }



    //deleting menu item by id
    @DeleteMapping("/{id}")
    public String deleteMenuItem(@PathVariable long id) {
        Optional<MenuItem> existingItem = menuItemService.getMenuItemById(id);
        if (existingItem.isPresent()) {
            menuItemService.deleteMenuItem(id);
            return "Menu item deleted successfully.";
        } else {
            return "Menu item not found";
        }
    }
    //get item by Category(custom filter)

    @GetMapping("/category/{category}")
    public List<MenuItem> getMenuItemsByCategory(@PathVariable String category) {
        return menuItemService.getItemByCategory(category);
    }
}



















