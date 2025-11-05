package com.urbanspice.service;
import com.urbanspice.model.MenuItem;
import com.urbanspice.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service

public class MenuItemService {
  @Autowired
  private MenuItemRepository menuItemRepository;
  //creating new menu item
  public MenuItem createMenuItem(MenuItem menuItem){
      return menuItemRepository.save(menuItem);}
      //getting all the MenuItem
       public List<MenuItem> getAllMenuItem(){
      return menuItemRepository.findAll();
       }



       //getting the Menu item by id

    public Optional<MenuItem> getMenuItemById(Long id){
      return menuItemRepository.findById(id);
    }

    //updating menu item


    public MenuItem updateMenuItem(Long id, MenuItem updatedItem){
      Optional<MenuItem>existingOpt = menuItemRepository.findById(id);
      if(existingOpt.isPresent()){
          MenuItem existing = existingOpt.get();
          existing.setName(updatedItem.getName());
          existing.setPrice(updatedItem.getPrice());
          existing.setCategory(updatedItem.getCategory());
          return menuItemRepository.save(existing);
      } return null;
  }
  //Deleting a menu item by id
    public void deleteMenuItem(Long id){
      menuItemRepository.deleteById(id);
    }


      }














