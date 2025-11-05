package com.urbanspice.service;
import com.urbanspice.model.User;
import com.urbanspice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    //crating a new user
    public User createUser(User user){
        return userRepository.save(user);
    }
    //getting all the users
    public List <User>getAllUsers(){
        return userRepository.findAll();
    }

    //getting user by id
    public Optional<User>getUserById(Long id){
        return userRepository.findById(id);
    }

    //Updating existing User
    public User updateUser( Long id, User updatedUser){
        Optional<User>existingOpt = userRepository.findById(id);
        if(existingOpt.isPresent()) {
            User existing = existingOpt.get();
            existing.setName(updatedUser.getName());
            existing.setEmail(updatedUser.getEmail());
            return userRepository.save(existing);
        }
        return null;

        }
        //delete user by id
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
// custom methods
    //getting user by name
    public List<User> getUsersByName( String name){
        return userRepository.findByName(name);
    }

//get user by email
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
    }











