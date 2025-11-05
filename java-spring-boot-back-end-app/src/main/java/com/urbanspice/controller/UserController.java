package com.urbanspice.controller;
import com.urbanspice.repository.UserRepository;
import com.urbanspice.service.UserService;
import com.urbanspice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")


public class UserController {

    @Autowired

    private UserService userService;

    //create user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    //read all user

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    // read user by id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    //update the user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User existing = userService.getUserById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedUser.getName());
            existing.setEmail(updatedUser.getEmail());
            return userService.updateUser(id,updatedUser);
        }
        return null;
    }

    //delete the existing user by id
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        Optional<User> existingUser = userService.getUserById(id);
        if (existingUser.isPresent()) {
            userService.deleteUser(id);
            return "user successfully deleted.";
        } else {
            return "user not found.";
        }
    }

        // Custom filters

// Get all users by name
        @GetMapping("/name/{name}")
        public List<User> getUsersByName(@PathVariable String name) {
            return userService.getUsersByName(name);
        }


// Get a single user by email
        @GetMapping("/email/{email}")
        public User getUserByEmail(@PathVariable String email) {
            return userService.getUserByEmail(email);
        }




    }




















