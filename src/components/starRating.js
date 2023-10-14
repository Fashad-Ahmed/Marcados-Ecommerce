// import { Flex } from "@chakra-ui/react"
// import { FaStar } from "react-icons/fa"

// const StarRating = ({ rating }) => {
//     return (
//         <Flex>
//             <FaStar style={{ color: (rating > 1)? "orange": "#d4d4d4", margin: "2px", fontSize: "10px" }} />
//             <FaStar style={{ color: (rating > 2)? "orange": "#d4d4d4", margin: "2px", fontSize: "10px" }} />
//             <FaStar style={{ color: (rating > 3)? "orange": "#d4d4d4", margin: "2px", fontSize: "10px" }} />
//             <FaStar style={{ color: (rating > 4)? "orange": "#d4d4d4", margin: "2px", fontSize: "10px" }} />
//             <FaStar style={{ color: (rating > 5)? "orange": "#d4d4d4", margin: "2px", fontSize: "10px" }} />
//         </Flex>
//     )
// }

// export default StarRating;

import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRate(selectedRating); // Send the rating to the parent component or a function to save it to the database
  };

  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          style={{
            color: rating >= star ? 'orange' : '#d4d4d4',
            margin: '2px',
            fontSize: '20px',
            cursor: 'pointer',
            marginLeft: '30px'
          }}
          onClick={() => handleStarClick(star)}
        />
      ))}
    </Flex>
  );
};

export default StarRating;
