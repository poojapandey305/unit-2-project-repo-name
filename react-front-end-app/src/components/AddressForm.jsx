import { useNavigate } from "react-router-dom"; // For navigating between pages
import { useState } from "react";               // For managing component state
import './AddressForm.css';                     // CSS file for styling
import Button from './Button';                  // Reusable Button component

function AddressForm() {
  const navigate = useNavigate(); // Used to navigate to other pages

  // Creating a state object to store the values entered in the form fields
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Creating state to store error messages
  const [errors, setErrors] = useState({});

  // For handling input changes and clear individual field errors
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  // Validate all fields in the form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) { /* If the pincode is not exactly 6 digits (only numbers), show an error
// ^ = start of string, \d = digit, {6} = exactly 6 times, $ = end of string*/
      newErrors.pincode = "Pincode must be a 6-digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handling clicking "Next" button
  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/checkout");
    }
  };

  // Handling clicking to previous page button
  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleNext}>
      <h2>Delivery Address</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <div className="errorMsg">{errors.name}</div>}
      {/*Input field for entering the address*/} 

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      {/*For showing an error message below the address field if it exists*/}
      {errors.address && <div className="errorMsg">{errors.address}</div>}

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
       {/*For showing an error message below the city field if it exists*/}
      {errors.city && <div className="errorMsg">{errors.city}</div>}

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
      />
       {/*For showing an error message below the pincode field if it exists*/}
      {errors.pincode && <div className="errorMsg">{errors.pincode}</div>}

      <div>
        <Button text="⬅ Previous" onClick={handlePrevious} className="prvButton" />
        <Button text="Next ➡" type="submit" className="nxtButton" />
      </div>
    </form>
  );
}

export default AddressForm;