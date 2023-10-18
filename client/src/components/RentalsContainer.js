import React from "react";
import RentalCard from "./RentalCard";

const RentalsContainer = ( { rentals, user } ) => {
    const rentalCards = rentals.map((rental) => {
       return <RentalCard
            key={rental.id}
            rental={rental}
            name={rental.name}
            location={rental.location}
            price={rental.price}
            description={rental.description}
            image={rental.image}
            user={user}
        />
    })
    return (<div>
        <ul>
            <li>{rentalCards}</li>
        </ul>

    </div>)
}

export default RentalsContainer
