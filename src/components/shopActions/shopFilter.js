// ShopFilters.js
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
import { useEffect, useState } from "react";

const ShopFilters = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  handleFilters,
  clearFilters,
  current,
  setCurrent,
}) => {
  const [filters, setFilters] = useState({
    categories: selectedCategories || [],
    price: [1, 1000], // Set the default price range
  });

  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategoryClick = (category) => {
    console.log("handleCategoryClick", category);
    setSelectedCategories(category?._id);
    setCurrentCategory(category);
  };

  useEffect(() => {
    // if (current === "Price") {
    //   handleFilters(filters);
    // }
  }, [current, filters, handleFilters]);

  const handleCategories = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((item) => item !== category)
      : [...filters.categories, category];

    setFilters({ ...filters, categories: updatedCategories });
  };

  return (
    <Box w={["100%", "100%", "320px"]} h="100%" p="2" bgColor={"gray.100"}>
      <Text p="20px" border="1px solid gray.100">
        Filter Products
      </Text>

      <Box>
        <Select
          onChange={(e) => setCurrent(e.target.value)}
          value={current}
          name="current"
          borderRadius="0"
          my="5"
          backgroundColor="white"
        >
          <option>-- Select filter --</option>
          <option>Category</option>
          <option>Price</option>
        </Select>
        <ButtonGroup spacing={2} flexWrap="wrap">
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
                fontSize={14}
                marginTop="12px"
              >
                {category?.name}
              </Button>
            ))}
        </ButtonGroup>

        {current == "Price" && (
          <>
            <RangeSlider
              max={1000}
              aria-label={"price"}
              colorScheme="green"
              defaultValue={filters.price}
              onChangeEnd={(val) => setFilters({ ...filters, price: val })}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack bgColor={"brand.900"} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Flex justify="space-between" w="100%">
              <Text>Min: {filters.price[0]}</Text>
              <Text>Max: {filters.price[1]}</Text>
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
          onClick={() => handleFilters(filters)}
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
