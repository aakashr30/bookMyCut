import React, { useEffect, useRef } from 'react';
import './cards.css';
import { IoLocationSharp } from "react-icons/io5";

function Cards() {
  const cardData = [
    { id: 1, image: 'https://i.etsystatic.com/33607814/r/il/293cf9/4298466371/il_570xN.4298466371_hz8p.jpg', openingTime: '9:00 AM', closingTime: '7:00 PM', rating: 4 },
    { id: 2, image: 'https://i.pinimg.com/originals/76/21/bb/7621bb6087ee02d1c51a38663c88e6b0.jpg', openingTime: '9:00 AM', closingTime: '7:00 PM', rating: 5 },
    { id: 3, image: 'https://m.media-amazon.com/images/I/71rDY8xzSQL._AC_UF894,1000_QL80_.jpg', openingTime: '9:00 AM', closingTime: '7:00 PM', rating: 3 },
    { id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHjMW9aabnc7IpbExomL574qmSN6XolnQF0sKE9ltYdT4fBW2filVcoCm_P0s9kwqW_CA&usqp=CAU', openingTime: '9:00 AM', closingTime: '7:00 PM', rating: 4 },
    { id: 5, image: 'https://images.fresha.com/locations/location-profile-images/109064/1610649/a5b06e87-c664-45d8-bba1-b965ba42dc8f.jpg?class=width-small', openingTime: '9:00 AM', closingTime: '7:00 PM', rating: 2 },
    { id: 6, image: 'https://images.fresha.com/locations/location-profile-images/109064/649790/41ab50b0-bfac-4bd7-a2af-a3a0cd75fa99.jpg?class=venue-gallery-mobile', openingTime: '9:00 AM', closingTime: '7:00 PM', rating: 5 },
  ];

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ 
          left: 200, // Adjust scroll amount as needed
          behavior: 'smooth' 
        });
      }
    }, 2000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <div className="Headings" style={{ backgroundColor: 'black' }}>
        <h2><IoLocationSharp /> Shops Near By</h2>
      </div>
      <div className="cards-container" ref={scrollContainerRef}>
        {cardData.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-image">
              <img src={card.image} alt="Haircut Shop" />
            </div>
            <div className="card-content">
              <div className="hours">
                <span className="time">Opens at: <strong>{card.openingTime}</strong></span>
                <span className="time">Closes at: <strong>{card.closingTime}</strong></span>
              </div>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={index < card.rating ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <button className="book-now">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
