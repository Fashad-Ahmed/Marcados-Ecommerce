import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  FaAnchor,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useForgetPasswordHook } from "../hooks/useForgetPasswordHook";
import { useVerifyOtpHook } from "../hooks/useVerifyOtpHook";
import { useSetPasswordHook } from "../hooks/useSetPasswordHook";

const ForgotPassword = () => {
  const [type, setType] = useState(true);
  const [typeTwo, setTypeTwo] = useState(true);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [forgetPasswordFunc] = useForgetPasswordHook();
  const [verifyOtpFunc] = useVerifyOtpHook();
  const [ResetPasswordFunc] = useSetPasswordHook();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const onSubmit = (values) => {
    if (counter === 1 || counter === 0) {
      if (counter === 0) {
        forgetPasswordFunc({
          email: values.email,
        }).then(() => {
          setCounter(counter + 1);
        });
      } else {
        verifyOtpFunc({
          email: values.email,
          otp: values.otp,
        }).then(() => {
          setCounter(counter + 1);
        });
      }
    } else {
      const password = getValues("password");
      const confirmPassword = getValues("confirmPassword");

      if (password === confirmPassword) {
        ResetPasswordFunc({
          email: values.email,
          password: values.password,
        });
      } else {
        setValue("confirmPassword", "", { shouldValidate: true });
        setValue("password", "", { shouldValidate: true });
      }
    }
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">Forgot Password</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            {counter === 0 ? (
              <FormControl mt="4">
                <FormLabel fontSize="14px">Email address </FormLabel>

                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
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
                        {...field}
                      />
                    </Flex>
                  )}
                />
                {errors.email && (
                  <Text color="red" fontSize="12px">
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>
            ) : counter === 1 ? (
              <FormControl mt="4">
                <FormLabel fontSize="14px">OTP</FormLabel>
                <Controller
                  name="otp"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "OTP is required",
                  }}
                  render={({ field }) => (
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
                        <FaAnchor />
                      </Button>
                      <Input
                        type="text"
                        fontSize="14px"
                        borderRadius="0"
                        border="none"
                        placeholder="Enter the OTP received on your email address"
                        {...field}
                      />
                    </Flex>
                  )}
                />
                {errors.otp && (
                  <Text color="red" fontSize="12px">
                    {errors.otp.message}
                  </Text>
                )}
              </FormControl>
            ) : (
              <>
                <FormControl mt="4">
                  <FormLabel fontSize="14px">Password </FormLabel>

                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      // minLength: {
                      //   value: 6,
                      //   message: "Password must be at least 6 characters",
                      // },
                    }}
                    render={({ field }) => (
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
                          placeholder="Enter your new password"
                          {...field}
                        />
                        <Button
                          p="3"
                          border="1px"
                          borderRadius="0"
                          borderColor="gray.100"
                          bgColor="white"
                          onClick={() => setType(!type)}
                        >
                          {type ? <FaEye /> : <FaEyeSlash />}
                        </Button>
                      </Flex>
                    )}
                  />
                  {errors.password && (
                    <Text color="red" fontSize="12px">
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl mt="4">
                  <FormLabel fontSize="14px">Confirm Password </FormLabel>

                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    }}
                    render={({ field }) => (
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
                          type={typeTwo ? "password" : "text"}
                          fontSize="14px"
                          borderRadius="0"
                          border="none"
                          placeholder="Enter your password again"
                          {...field}
                        />
                        <Button
                          p="3"
                          border="1px"
                          borderRadius="0"
                          borderColor="gray.100"
                          bgColor="white"
                          onClick={() => setTypeTwo(!typeTwo)}
                        >
                          {typeTwo ? <FaEye /> : <FaEyeSlash />}
                        </Button>
                      </Flex>
                    )}
                  />
                  {errors.confirmPassword && (
                    <Text color="red" fontSize="12px">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              fontSize="14px"
              borderRadius="2px"
              border="1px solid brand.900"
              bgColor="brand.900"
              color="white"
              w="100%"
              mt="6"
              _hover={{ bgColor: "orange.400" }}
            >
              Update
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;

//   const handleForgotPassword = () => {
//     if (counter === 1 || counter === 0) {
//       setCounter(counter + 1);
//     } else {
//       navigate("/Login");
//     }
//   };

//   return (
//     <Flex m="20px" justify="center" fontSize="14px">
//       <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
//         <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
//           <Heading textAlign="center">Forgot Password</Heading>

//           {/* <Alert status="error">
//                         <AlertIcon/>
//                         <AlertDescription>{errorMsg}</AlertDescription>
//                     </Alert> */}
//           {counter === 0 ? (
//             <FormControl mt="4">
//               <FormLabel fontSize="14px">Email address </FormLabel>

//               <Flex
//                 align="center"
//                 w="100%"
//                 p="2px"
//                 border="1px"
//                 borderColor="gray.100"
//                 borderRadius="0"
//               >
//                 <Button
//                   href="/"
//                   bgColor="gray.100"
//                   p="3"
//                   border="1px"
//                   borderRadius="0"
//                   borderColor="gray.100"
//                 >
//                   <FaEnvelope />
//                 </Button>
//                 <Input
//                   type="email"
//                   fontSize="14px"
//                   borderRadius="0"
//                   border="none"
//                   placeholder="Enter your email address"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Flex>
//             </FormControl>
//           )
// : counter === 1 ? (
//             <FormControl mt="4">
//               <FormLabel fontSize="14px">OTP </FormLabel>

//               <Flex
//                 align="center"
//                 w="100%"
//                 p="2px"
//                 border="1px"
//                 borderColor="gray.100"
//                 borderRadius="0"
//               >
//                 <Button
//                   href="/"
//                   bgColor="gray.100"
//                   p="3"
//                   border="1px"
//                   borderRadius="0"
//                   borderColor="gray.100"
//                 >
//                   <FaAnchor />
//                 </Button>
//                 <Input
//                   type="email"
//                   fontSize="14px"
//                   borderRadius="0"
//                   border="none"
//                   placeholder="Enter the OTP recieved on your email address"
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//               </Flex>
//             </FormControl>
//           ) : (
//             <>
//               <FormControl mt="4">
//                 <FormLabel fontSize="14px">Password </FormLabel>

//                 <Flex
//                   align="center"
//                   w="100%"
//                   p="2px"
//                   border="1px"
//                   borderColor="gray.100"
//                   borderRadius="0"
//                 >
//                   <Button
//                     href="/"
//                     bgColor="gray.100"
//                     p="3"
//                     border="1px"
//                     borderRadius="0"
//                     borderColor="gray.100"
//                   >
//                     <FaLock />
//                   </Button>
//                   <Input
//                     type={type ? "password" : "text"}
//                     fontSize="14px"
//                     borderRadius="0"
//                     border="none"
//                     placeholder="Enter your new password"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <Button
//                     p="3"
//                     border="1px"
//                     borderRadius="0"
//                     borderColor="gray.100"
//                     bgColor="white"
//                     onClick={() => setType(!type)}
//                   >
//                     <FaEye />
//                   </Button>
//                 </Flex>
//               </FormControl>
//               <FormControl mt="4">
//                 <FormLabel fontSize="14px">Confirm Password </FormLabel>

//                 <Flex
//                   align="center"
//                   w="100%"
//                   p="2px"
//                   border="1px"
//                   borderColor="gray.100"
//                   borderRadius="0"
//                 >
//                   <Button
//                     href="/"
//                     bgColor="gray.100"
//                     p="3"
//                     border="1px"
//                     borderRadius="0"
//                     borderColor="gray.100"
//                   >
//                     <FaLock />
//                   </Button>
//                   <Input
//                     type={type ? "password" : "text"}
//                     fontSize="14px"
//                     borderRadius="0"
//                     border="none"
//                     placeholder="Enter your password again"
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                   <Button
//                     p="3"
//                     border="1px"
//                     borderRadius="0"
//                     borderColor="gray.100"
//                     bgColor="white"
//                     onClick={() => setType(!type)}
//                   >
//                     <FaEye />
//                   </Button>
//                 </Flex>
//               </FormControl>
//             </>
//           )}

//           <Button
//             fontSize="14px"
//             borderRadius="2px"
//             border="1px solid brand.900"
//             bgColor="brand.900"
//             color="white"
//             w="100%"
//             mt="6"
//             _hover={{ bgColor: "orange.400" }}
//             onClick={() => handleForgotPassword()}
//           >
//             Update
//           </Button>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// };

// export default ForgotPassword;
