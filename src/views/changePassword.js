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
import { useState } from "react";
import { FaEye, FaLock } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { useChangePasswordHook } from "../hooks/useChangePasswordHook";

const ChangePassword = () => {
    const [type, setType] = useState(true);
    const changePasswordFunc = useChangePasswordHook()
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const onSubmit = (data) => {
        changePasswordFunc({
            currentPassword: data.password,
            newPassword: data.confirmPassword
        })
    };

    return (
        <Flex m="20px" justify="center" fontSize="14px">
            <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
                <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
                    <Heading textAlign="center">Change Password</Heading>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl mt="4">
                            <FormLabel fontSize="14px">Password </FormLabel>

                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Password is required",
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
                                            <FaEye />
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
                                            type={type ? "password" : "text"}
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
                                            onClick={() => setType(!type)}
                                        >
                                            <FaEye />
                                        </Button>
                                    </Flex>
                                )}
                            />
                            {errors.confirmPassword && (
                                <Text color="red" fontSize="12px">
                                    {errors.confirmPassword.message}
                                </Text>
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
                        </FormControl>
                    </form>
                </Box>
            </Flex>
        </Flex>
    );
};

export default ChangePassword;
