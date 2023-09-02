import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaLandmark,
  FaLock,
  FaPhone,
  FaUber,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bg from "../assets/imgs/bg.jpg";
import { signUp } from "../firebase";
import { userSignup } from "../redux/slice/authSlice";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState(true);
  const [cpasswordtype, setCpasswordtype] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    let data = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      address: values.address,
      phoneNumber: values.phoneNumber,
    };
    console.log("Form data", data);
    // Pass data to your API here
  };

  return (
    <Flex
      m="20px"
      justify="center"
      fontSize="14px"
      backgroundImage={`url(${bg})`}
      bgSize="cover"
    >
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box
          as="form"
          p="20px"
          w={["100%", "400px", "500px"]}
          my="20px"
          bgColor="white"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Heading textAlign="center">Register!</Heading>
          <Text textAlign="center" fontWeight="600" py="3">
            Fill in your details to signup.
          </Text>

          <FormControl mt="4" isInvalid={errors.email}>
            <FormLabel fontSize="14px">Email address </FormLabel>
            <Flex
              align="center"
              w="100%"
              p="2px"
              border="1px"
              borderColor="gray.100"
              borderRadius="0"
            >
              <Button
                href="/"
                bgColor="gray.100"
                p="3"
                border="1px"
                borderRadius="0"
                borderColor="gray.100"
              >
                <FaEnvelope />
              </Button>
              <Input
                type="email"
                fontSize="14px"
                borderRadius="0"
                border="none"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </Flex>
            {errors.email && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
          </FormControl>

          <Flex
            align="center"
            w="100%"
            p="2px"
            border="1px"
            borderColor="gray.100"
            borderRadius="0"
          >
            <Button
              href="/"
              bgColor="gray.100"
              p="3"
              border="1px"
              borderRadius="0"
              borderColor="gray.100"
            >
              <FaLock />
            </Button>
            <Input
              type={type ? "password" : "text"}
              fontSize="14px"
              borderRadius="0"
              border="none"
              placeholder="Enter your password"
              {...register("password", {
                required: "Required",
              })}
            />
          </Flex>
          {errors.password && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.password.message}</AlertDescription>
            </Alert>
          )}
          <Flex
            align="center"
            w="100%"
            p="2px"
            border="1px"
            borderColor="gray.100"
            borderRadius="0"
          >
            <Button
              href="/"
              bgColor="gray.100"
              p="3"
              border="1px"
              borderRadius="0"
              borderColor="gray.100"
            >
              <FaUber />
            </Button>
            <Input
              type="text"
              fontSize="14px"
              borderRadius="0"
              border="none"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Required",
              })}
            />
          </Flex>
          {errors.fullName && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.fullName.message}</AlertDescription>
            </Alert>
          )}

          <Flex
            align="center"
            w="100%"
            p="2px"
            border="1px"
            borderColor="gray.100"
            borderRadius="0"
          >
            <Button
              href="/"
              bgColor="gray.100"
              p="3"
              border="1px"
              borderRadius="0"
              borderColor="gray.100"
            >
              <FaLandmark />
            </Button>
            <Input
              type="text"
              fontSize="14px"
              borderRadius="0"
              border="none"
              placeholder="Enter your address"
              {...register("address", {
                required: "Required",
              })}
            />
          </Flex>
          {errors.address && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.address.message}</AlertDescription>
            </Alert>
          )}
          <Flex
            align="center"
            w="100%"
            p="2px"
            border="1px"
            borderColor="gray.100"
            borderRadius="0"
          >
            <Button
              href="/"
              bgColor="gray.100"
              p="3"
              border="1px"
              borderRadius="0"
              borderColor="gray.100"
            >
              <FaPhone />
            </Button>
            <Input
              type="tel"
              fontSize="14px"
              borderRadius="0"
              border="none"
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Required",
                pattern: {
                  value: /^(?:\+\d{1,3}|\d{1,4})?\d{7,14}$/,
                  message: "Invalid phone number",
                },
              })}
            />
          </Flex>
          {errors.phoneNumber && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.phoneNumber.message}</AlertDescription>
            </Alert>
          )}

          <Button
            fontSize="14px"
            borderRadius="2px"
            border="1px solid brand.900"
            bgColor="brand.900"
            color="white"
            w="100%"
            mt="6"
            _hover={{ bgColor: "orange.400" }}
            type="submit"
          >
            Sign up
          </Button>

          <Text mt="4">
            Already have an account?{" "}
            <Link href="/Login" color="brand.900">
              Login
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;

// import {
//   Box,
//   Flex,
//   Text,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Link,
//   Button,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { FaEnvelope, FaEye, FaLock } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import bg from "../assets/imgs/bg.jpg";
// import { signUp } from "../firebase";
// import { userSignup } from "../redux/slice/authSlice";

// const Register = () => {
//   const [type, setType] = useState(true);
//   const [cpasswordtype, setCpasswordtype] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleRegister = () => {};

//   return (
//     <Flex
//       m="20px"
//       justify="center"
//       fontSize="14px"
//       backgroundImage={`url(${bg})`}
//       bgSize="cover"
//     >
//       <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
//         <Box p="20px" w={["100%", "400px", "500px"]} my="20px" bgColor="white">
//           <Heading textAlign="center">Register!</Heading>
//           <Text textAlign="center" fontWeight="600" py="3">
//             Fill in your details to signup.
//           </Text>

//           <FormControl mt="4">
//             <FormLabel fontSize="14px">Email address </FormLabel>

//             <Flex
//               align="center"
//               w="100%"
//               p="2px"
//               border="1px"
//               borderColor="gray.100"
//               borderRadius="0"
//             >
//               <Button
//                 href="/"
//                 bgColor="gray.100"
//                 p="3"
//                 border="1px"
//                 borderRadius="0"
//                 borderColor="gray.100"
//               >
//                 <FaEnvelope />
//               </Button>
//               <Input
//                 type="email"
//                 fontSize="14px"
//                 borderRadius="0"
//                 border="none"
//                 placeholder="Enter your email address"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Flex>
//           </FormControl>

//           <FormControl mt="4">
//             <FormLabel fontSize="14px">Password </FormLabel>

//             <Flex
//               align="center"
//               w="100%"
//               p="2px"
//               border="1px"
//               borderColor="gray.100"
//               borderRadius="0"
//             >
//               <Button
//                 href="/"
//                 bgColor="gray.100"
//                 p="3"
//                 border="1px"
//                 borderRadius="0"
//                 borderColor="gray.100"
//               >
//                 <FaLock />
//               </Button>
//               <Input
//                 type={type ? "password" : "text"}
//                 fontSize="14px"
//                 borderRadius="0"
//                 border="none"
//                 placeholder="Enter your password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button
//                 p="3"
//                 border="1px"
//                 borderRadius="0"
//                 borderColor="gray.100"
//                 bgColor="white"
//                 onClick={() => setType(!type)}
//               >
//                 <FaEye />
//               </Button>
//             </Flex>
//           </FormControl>

//           <FormControl mt="4">
//             <FormLabel fontSize="14px">Confirm Password </FormLabel>

//             <Flex
//               align="center"
//               w="100%"
//               p="2px"
//               border="1px"
//               borderColor="gray.100"
//               borderRadius="0"
//             >
//               <Button
//                 href="/"
//                 bgColor="gray.100"
//                 p="3"
//                 border="1px"
//                 borderRadius="0"
//                 borderColor="gray.100"
//               >
//                 <FaLock />
//               </Button>
//               <Input
//                 type={cpasswordtype ? "password" : "text"}
//                 fontSize="14px"
//                 borderRadius="0"
//                 border="none"
//                 placeholder="Enter your password again"
//               />
//               <Button
//                 p="3"
//                 border="1px"
//                 borderRadius="0"
//                 borderColor="gray.100"
//                 bgColor="white"
//                 onClick={() => setCpasswordtype(!cpasswordtype)}
//               >
//                 <FaEye />
//               </Button>
//             </Flex>
//           </FormControl>

//           <Button
//             fontSize="14px"
//             borderRadius="2px"
//             border="1px solid brand.900"
//             bgColor="brand.900"
//             color="white"
//             w="100%"
//             mt="6"
//             _hover={{ bgColor: "orange.400" }}
//             onClick={() => handleRegister()}
//           >
//             Sign up
//           </Button>

//           <Text mt="4">
//             Already have an account?{" "}
//             <Link href="/Login" color="brand.900">
//               Login
//             </Link>
//           </Text>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// };

// export default Register;
