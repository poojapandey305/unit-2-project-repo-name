package com.urbanspice.controller;
import com.urbanspice.repository.UserRepository;
import com.urbanspice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/users")


public class UserController {

    @Autowired

    private UserRepository userRepository;

    //create user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    //read all user

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    // read user by id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    //update the user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User existing = userRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedUser.getName());
            existing.setEmail(updatedUser.getEmail());
            return userRepository.save(existing);
        }
        return null;
    }

    //delete the existing user by id
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return "user successfully deleted.";
        } else {
            return "user not found.";
        }
    }
}














