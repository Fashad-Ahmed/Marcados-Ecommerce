import { Box, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useMatch } from "react-router-dom";

const SearchBar = () => {
  const { t } = useTranslation("common");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isOnRoute = useMatch("/TypeSearch");

  const handleSearch = (query) => {
    navigate(`/TypeSearch`);
    localStorage.setItem("TypeSearch", query);
  };

  if (isOnRoute) return null;

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
        placeholder={t("SEARCH_HERE")}
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
    </Flex>
  );
};

export default SearchBar;
