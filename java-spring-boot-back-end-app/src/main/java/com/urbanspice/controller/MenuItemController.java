package com.urbanspice.controller;

import com.urbanspice.model.MenuItem;
import com.urbanspice.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menuItems")
public class MenuItemController{
    @Autowired
    private MenuItemRepository menuItemRepository;
    @PostMapping
    public MenuItem createMenuItem(@RequestBody MenuItem menuItem){
        return menuItemRepository.save(menuItem);
    }
    // getting all the menu items
    @GetMapping
    public List <MenuItem>getAllMenuItems(){
        return menuItemRepository.findAll();
    }

    // getting the menu item by id
    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id){
        return menuItemRepository.findById(id).orElse(null);
    }

    //updating a menu item
    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id, @RequestBody MenuItem updatedItem) {
        MenuItem existingItem = menuItemRepository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setName(updatedItem.getName());
            existingItem.setPrice(updatedItem.getPrice());
            existingItem.setCategory(updatedItem.getCategory());
            return menuItemRepository.save(existingItem);}
            return null;

        }
//deleting menu item by id
    @DeleteMapping("/{id}")
    public String deleteMenuItem(@PathVariable long id){
    if (menuItemRepository.existsById(id)){
        menuItemRepository.deleteById(id);
            return "Menu item deleted successfully.";
        }else{
            return "Menu item not found";
        }}
    //get item by Category(custom filter)

        @GetMapping("/category/{category}")
        public List<MenuItem>getMenuItemsByCategory(@PathVariable String category)   {
            return menuItemRepository.findByCategory(category);
        }






    }












