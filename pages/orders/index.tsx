import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cancelOrder, fulfillOrder, getOrders } from "../../api/orders";

const OrdersPage: NextPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const loadOrders = async () => {
    const items = await getOrders();
    setOrders(items);
    setLoading(false);
  };
  useEffect(() => {
    loadOrders();
  }, []);
  if (loading) return <CircularProgress />;
  const handleCancel = (orderId: string) => async () => {
    await cancelOrder(orderId);
    loadOrders();
  };
  const handleFulfill = (orderId: string) => async () => {
    await fulfillOrder(orderId);
    loadOrders();
  };
  return (
    <Card>
      <CardHeader
        title="orders"
        action={
          <Link href={"/items"}>
            <Button>Items</Button>
          </Link>
        }
      />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>items</TableCell>
              <TableCell>items number</TableCell>
              <TableCell>total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow>
                <TableCell>{order._id}</TableCell>
                <TableCell>
                  {order.items.map((item: any) => item.item.name).join(" , ")}
                </TableCell>
                <TableCell>{order.items.length}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell align="right">
                  {order.status != "FulFilled" && (
                    <Button onClick={handleCancel(order._id)}>Cancel</Button>
                  )}{" "}
                  {order.status != "Cancel" && (
                    <Button onClick={handleFulfill(order._id)}>Fulfill</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default OrdersPage;
