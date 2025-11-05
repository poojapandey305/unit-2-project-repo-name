package com.urbanspice.service;



import com.urbanspice.model.Address;
import com.urbanspice.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    // Create new address
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    // Get all addresses
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    //  Get address by ID
    public Optional<Address> getAddressById(Long id) {
        return addressRepository.findById(id);
    }

    // Update existing address
    public Address updateAddress(Long id, Address updatedAddress) {
        Optional<Address> existingOpt = addressRepository.findById(id);
        if (existingOpt.isPresent()) {
            Address existing = existingOpt.get();
            existing.setStreet(updatedAddress.getStreet());
            existing.setCity(updatedAddress.getCity());
            existing.setState(updatedAddress.getState());
            existing.setZipCode(updatedAddress.getZipCode());

            return addressRepository.save(existing);
        }
        return null;
    }

    // Delete address
    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }


public List<Address> getAddressesByCity(String city) {
    return addressRepository.findByCity(city);
}



public List<Address> getAddressesByState(String state) {
    return addressRepository.findByState(state);
}
}
