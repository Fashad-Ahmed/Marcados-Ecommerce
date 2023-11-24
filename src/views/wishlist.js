import { Box, Grid } from "@chakra-ui/react";
import Heading from "../components/heading";
import { useSelector } from "react-redux";
import Product from "../components/product";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.data.wishlist.wishlist);
  const { t } = useTranslation("common");

  return (
    <Box py="30px">
      <Heading
        mainText={t("MY_WISHLIST")}
        subText={t("SAVED_PRODUCTS_MESSAGE")}
      />

      <Grid
        gap={4}
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        px={["20px", "20px", "10%"]}
      >
        {wishlist &&
          wishlist?.map((product) => {
            return <Product product={product} key={product._id} />;
          })}
      </Grid>
    </Box>
  );
};

export default Wishlist;
