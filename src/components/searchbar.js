import { Box, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query) => {
    console.log("query", query);
    navigate(`/TypeSearch?query=${query}`);
    localStorage.setItem("TypeSearch", query);
  };

  return (
    <Flex
      align="center"
      w="100%"
      p="2px"
      border="2px"
      borderColor="brand.900"
      borderRadius="22px"
      position="relative"
    >
      <Input
        placeholder="Search here"
        fontSize="14px"
        borderWidth="0px"
        focusBorderColor="transparent"
        errorBorderColor="transparent"
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.target.value);
          }
        }}
      />

      {query.length === 0 ? (
        <Box
          bgColor="gray.100"
          p="3"
          border="1px"
          borderRadius="22px"
          borderColor="gray.100"
        >
          <FaSearch />
        </Box>
      ) : (
        <div onClick={() => handleSearch(query)}>
          <Box
            bgColor="gray.100"
            p="3"
            border="1px"
            borderRadius="22px"
            borderColor="gray.100"
          >
            <FaSearch />
          </Box>
        </div>
      )}
      {/* <Box
        position="absolute"
        top="100%"
        left="0"
        w="100%"
        bgColor="white"
        shadow="sm"
        zIndex="10000"
      >
        {products &&
          products
            .filter(
              (product) =>
                query !== "" &&
                product.title.toUpperCase().indexOf(query.toUpperCase()) !== -1
            )
            .map((item) => {
              return (
                <Box p="2" key={item.id}>
                  <Link
                    to={{
                      pathname: "/SingleProduct",
                      search: `?id=${item.id}`,
                    }}
                  >
                    {item.title}
                  </Link>
                </Box>
              );
            })}
      </Box> */}
    </Flex>
  );
};

export default SearchBar;
