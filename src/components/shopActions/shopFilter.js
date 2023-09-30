import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const ShopFilters = ({ categories, selectedCategories, handleFilters, clearFilters }) => {
  const [filters, setFilters] = useState({
    categories: selectedCategories || [],
  });

  const handleCategories = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((item) => item !== category)
      : [...filters.categories, category];

    setFilters({ ...filters, categories: updatedCategories });
  };

  const submitFilters = () => {
    handleFilters(filters);
  };

  return (
    <Box w={["100%", "100%", "320px"]} h="100%" p="2" bgColor={"gray.100"}>
      <Text p="20px" border="1px solid gray.100">
        Filter Products
      </Text>

      <Accordion p="20px" bgColor="white">
        <AccordionItem p="20px" bgColor={"gray.100"}>
          <AccordionButton fontWeight="600" color="brand.900">
            CATEGORIES
          </AccordionButton>
          <AccordionPanel>
            <Box>
              {categories.map((category, index) => (
                <Checkbox
                  key={index}
                  p="2"
                  colorScheme="green"
                  isChecked={filters.categories.includes(category)}
                  onChange={() => handleCategories(category)}
                >
                  {category?.name}
                </Checkbox>
              ))}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Flex p="20px">
        <Button
          bgColor="brand.900"
          color="white"
          flex="1"
          me="2"
          borderRadius="0"
          onClick={submitFilters}
        >
          Apply filters
        </Button>
        <Button bgColor="gray.100" onClick={clearFilters}>
          Clear
        </Button>
      </Flex>
    </Box >
  );
};

export default ShopFilters;

