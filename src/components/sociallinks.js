import { Flex, Link } from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const SocialLinks = () => {
  const data = useSelector((state) => state?.data?.general?.social);
  console.log(data);
  return (
    <Flex py="4">
      {data?.facebook ? (
        <Link
          href={data?.facebook}
          p="2"
          bgColor="gray.600"
          color="white"
          me="2"
          borderRadius="2px"
          target="_blank"
          _hover={{ bgColor: "brand.900" }}
        >
          <FaFacebook />
        </Link>
      ) : null}
      {data?.twitter ? (
        <Link
          href={data?.twitter}
          p="2"
          bgColor="gray.600"
          color="white"
          me="2"
          borderRadius="2px"
          target="_blank"
          _hover={{ bgColor: "brand.900" }}
        >
          <FaTwitter />
        </Link>
      ) : null}
      {data?.instagram ? (
        <Link
          href={data?.instagram}
          p="2"
          bgColor="gray.600"
          color="white"
          me="2"
          borderRadius="2px"
          target="_blank"
          _hover={{ bgColor: "brand.900" }}
        >
          <FaInstagram />
        </Link>
      ) : null}
      {data?.youtube ? (
        <Link
          href={data?.youtube}
          p="2"
          bgColor="gray.600"
          color="white"
          me="2"
          borderRadius="2px"
          target="_blank"
          _hover={{ bgColor: "brand.900" }}
        >
          <FaYoutube />
        </Link>
      ) : null}
      {data?.linkedin ? (
        <Link
          href={data?.linkedin}
          p="2"
          bgColor="gray.600"
          color="white"
          me="2"
          borderRadius="2px"
          target="_blank"
          _hover={{ bgColor: "brand.900" }}
        >
          <FaLinkedin />
        </Link>
      ) : null}
    </Flex>
  );
};

export default SocialLinks;
