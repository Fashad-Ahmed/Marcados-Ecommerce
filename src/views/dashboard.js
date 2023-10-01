import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const data = [
  { name: "Meat Orders", uv: 400, pv: 2400, amt: 2400 },
  { name: "Fruit Orders", uv: 100, pv: 1400, amt: 2400 },
  { name: "Grocery Orders", uv: 150, pv: 1900, amt: 2400 },
];

const Dashboard = () => {
  const user = useSelector((state) => state.data.user);
  return (
    <Flex m="20px" justify="center" fontSize="14px">

      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">

        <Box py="20px" my="20px" bgColor="white">
          <Text textAlign="center" justifyContent="center" fontWeight="600" py="6">
            ORDERS ANALYSIS
          </Text>
          {user && (
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          )}

        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
