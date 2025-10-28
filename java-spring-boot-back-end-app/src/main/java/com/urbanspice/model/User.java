package com.urbanspice.model;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
@Table (name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "user_id")
    private Long userId;
    private String name;
    private String email;

    //default constructor
    public User(){}


    //constructor with parameters
    public User(String name, String email){
        this.name= name;
        this.email = email;
    }


    //getter and setter
    public long getUserId(){
        return userId;
    }
public void setUserId(long userId){
        this.userId = userId;
}



public String getName(){
        return name;

}
public void setName(String name)
{
    this.name = name;
}
public String getEmail(){
        return email;
}
public void setEmail(String email){
        this.email = email;
}





}
