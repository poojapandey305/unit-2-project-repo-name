package com.urbanspice.controller;
import com.urbanspice.model.Address;
import com.urbanspice.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/addresses")

public class AddressController {
    @Autowired
    private AddressRepository addressRepository;
    // create
    @PostMapping

    private Address createAddress(@RequestBody Address address){
        return addressRepository.save(address);

    }

    //read all
    @GetMapping
    public List < Address>getAllAddressess(){
        return addressRepository.findAll();
    }
    //read by id
    @GetMapping ("/{id}")
    public Address getAddressById(@PathVariable Long id){
        return addressRepository.findById(id).orElse(null);
    }

    //Update

    @PutMapping("/{id}")
    public Address updateAddress(@PathVariable Long id, @RequestBody Address updatedAddress){
        Address existing = addressRepository.findById(id).orElse(null);
        if(existing!= null) {
            existing.setStreet(updatedAddress.getStreet());
            existing.setCity(updatedAddress.getCity());
            existing.setState(updatedAddress.getState());
            existing.setZipCode(updatedAddress.getZipCode());
            return addressRepository.save(existing);

        }
        return null ;
    }
    //delete by id
    @DeleteMapping("/{id}")
    public String deleteAddress(@PathVariable Long id){
        if (addressRepository.existsById(id)){
            addressRepository.deleteById(id);
return "address deleted successfully";
        }
            return" address not found";

    }

@GetMapping("/city/{city}")
    public List <Address>AddressessBYCity(@PathVariable String city){
        return addressRepository.findByCity(city);
}
    @GetMapping("state/{state}")
    public List <Address>AddressessBYState(@PathVariable String state){
        return addressRepository.findByState(state);
    }

}
