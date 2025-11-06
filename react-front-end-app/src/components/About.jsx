import React from 'react';
import './About.css';  // Import CSS styles for this component

function About() {
  return (
    <div className="aboutContainer">
      {/* Main heading for the About page */}
      <h2>About Urban Spice</h2>

      {/* Introductory paragraph about the restaurant */}
      <p className="aboutIntro">
        At Urban Spice, we celebrate the vibrant flavors of Indian vegetarian cuisine. 
        Our passion for authentic taste and warm service has made us a go-to spot 
        for food lovers since 2005.
      </p>

      {/* Definition list providing key info about the restaurant */}
      <dl className="infoList">
        <dt>Founded</dt> {/* Term */}
        <dd>2005</dd>    {/* Description */}

        <dt>Location</dt>
        <dd>USA</dd>
      </dl>

      {/* Section heading for order timings */}
      <h3>Order Timings</h3>

      {/* Table showing meal names and their ordering hours */}
      <table className="timingTable">
        <thead>
          <tr>
            <th>Meal</th>            {/* Column heading */}
            <th>Ordering Hours</th>  {/* Column heading */}
          </tr>
        </thead>
        <tbody>
          {/* Breakfast timing row */}
          <tr>
            <td>Breakfast</td>
            <td>7:00 AM – 10:30 AM</td>
          </tr>

          {/* Lunch timing row */}
          <tr>
            <td>Lunch</td>
            <td>12:00 PM – 3:00 PM</td>
          </tr>

          {/* Dinner timing row */}
          <tr>
            <td>Dinner</td>
            <td>6:30 PM – 10:00 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default About;