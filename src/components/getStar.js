import React from 'react';
import { Flex } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const GetStar = ({ rating }) => {
  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          style={{
            color: rating >= star ? 'orange' : '#d4d4d4',
            margin: '2px',
            fontSize: '20px',
          }}
        />
      ))}
    </Flex>
  );
};

export default GetStar;
