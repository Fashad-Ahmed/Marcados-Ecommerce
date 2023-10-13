import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const ShopFilters = ({
  categories,
  selectedCategories,
  handleFilters,
  clearFilters,
}) => {
  const [filters, setFilters] = useState({
    categories: selectedCategories || [],
  });

  const [current, setCurrent] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

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

      <Box>
        <Select
          onChange={(e) => setCurrent(e.target.value)}
          name="current"
          borderRadius="0"
          my="5"
          backgroundColor="white"
        >
          <option>-- Select filter --</option>
          <option>Category</option>
          <option>Price</option>
        </Select>
        <ButtonGroup spacing={2}>
          {current == "Category" &&
            categories.map((category) => (
              <Button
                key={category?._id}
                variant={
                  currentCategory?._id === category?._id ? "solid" : "outline"
                }
                colorScheme="green"
                onClick={() => handleCategoryClick(category)}
                borderWidth="1px"
                borderRadius="md"
                padding="2"
                cursor="pointer"
                _hover={{
                  bg: "green.100",
                }}
              >
                {category?.name}
              </Button>
            ))}
        </ButtonGroup>

        {/* // <Checkbox
            //   key={category._id}
            //   value={category._id}
            //   isChecked={selectedCategories.includes(category?._id)}
            //   onChange={() => handleCategories(category?._id)}
            //   borderWidth="1px" // Add a border
            //   borderRadius="md" // Rounded corners
            //   padding="2" // Padding to create space
            //   cursor="pointer" // Change cursor to pointer on hover
            //   _checked={{
            //     bg: "green.500", // Background color when checked
            //     color: "white", // Text color when checked
            //     borderColor: "green.500", // Border color when checked
            //   }}
            // >
            //   {category?.name}
            // </Checkbox> */}

        {current == "Price" && (
          <>
            <RangeSlider
              max={1000}
              aria-label={"price"}
              colorScheme="green"
              defaultValue={[0, 500]}
              onChangeEnd={(val) => setFilters({ ...filters, price: val })}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack bgColor={"brand.900"} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Flex justify="space-between" w="100%">
              <Text>Min: {0}</Text>
              <Text>Max: {20}</Text>
            </Flex>
          </>
        )}
      </Box>

      <Flex p="20px">
        <Button
          bgColor="brand.900"
          color="white"
          flex="1"
          me="2"
          borderRadius="0"
          onClick={submitFilters}
          _hover={{
            bgColor: "orange.400",
          }}
        >
          Apply filters
        </Button>
        <Button bgColor="gray.100" onClick={clearFilters}>
          Clear
        </Button>
      </Flex>
    </Box>
  );
};

export default ShopFilters;
