// // Child Window (Loader Component)

// import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { useSearchParams } from "react-router-dom";
// import { useHandlePayment } from "../hooks/useHandlePayment";
// import { get } from "../api";
// import configs from "../redux/config";

// const Loader = () => {
//   const { t } = useTranslation("common");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const paymentId = searchParams.get("paymentId");
//   const token = searchParams.get("token");
//   const PayerID = searchParams.get("PayerID");

//   // Declare openedWindow at the top level of the component
//   let openedWindow;

//   useEffect(() => {
//     // Define handleMessage within the useEffect scope
//     const handleMessage = (event) => {
//       if (event.data === "payment_success") {
//         // Perform any necessary actions in response to the success message
//         console.log("Payment was successful!");

//         // Close the child window
//         openedWindow.close();
//       }
//     };

//     // Add event listener for messages from parent window
//     window.addEventListener("message", handleMessage);

//     const handlePayment = async (data) => {
//       try {
//         openedWindow = window; // Store a reference to the current window

//         let response = await get(configs.endpoints.checkout.handlePayment, data);

//         if (!!response?.success) {
//           simulateSuccessAPIResponse();
//         } else {
//           console.error("Payment processing failed:", response?.error?.message);
//         }
//       } catch (error) {
//         console.error("Error processing payment:", error);
//       }
//     };

//     const simulateSuccessAPIResponse = () => {
//       if (window.opener) {
//         window.opener.postMessage("payment_success", "*");
//       } else {
//         console.error("window.opener is null. Unable to postMessage.");
//       }
//     };

//     handlePayment({ paymentId, token, PayerID });

//     return () => {
//       // Cleanup: Remove the event listener when the component is unmounted
//       window.removeEventListener("message", handleMessage);
//     };
//   }, [paymentId, token, PayerID]);

//   return (
//     <Flex
//       height="100vh"
//       justify="center"
//       align="center"
//       fontSize="14px"
//       bgColor="whiteAlpha.500"
//     >
//       <Box w={["100%", "400px", "500px"]} p="20px" bgColor="white">
//         <Heading p="20px" textAlign="center">
//           {t("RD")}
//         </Heading>
//         <Flex justify="center" align="center">
//           <Spinner size="xl" />
//         </Flex>
//       </Box>
//     </Flex>
//   );
// };

// export default Loader;

import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { get } from "../api";
import configs from "../redux/config";
import { handleChangePayment } from "../redux/slice/cartSlice";

const Loader = () => {
  const { t } = useTranslation("common");

  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const PayerID = searchParams.get("PayerID");

  useEffect(() => {
    handlePayment({ paymentId, token, PayerID });
  }, []);

  const handlePayment = async (data) => {
    try {
      let response = await get(configs.endpoints.checkout.handlePayment, data);
      console.log("response", response);
      if (!!response?.success) {
        window.close();
        handleChangePayment(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Flex
      height="100vh"
      justify="center"
      align="center"
      fontSize="14px"
      bgColor="whiteAlpha.500"
    >
      <Box w={["100%", "400px", "500px"]} p="20px" bgColor="white">
        <Heading p="20px" textAlign="center">
          {t("RD")}
        </Heading>
        <Flex justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Loader;