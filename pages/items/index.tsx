import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../api/items";
import { createOrder } from "../../api/orders";

const ItemsPage: NextPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const loadItems = async () => {
    const items = await getItems();
    setItems(items);
    setLoading(false);
  };
  const router = useRouter();
  useEffect(() => {
    loadItems();
  }, []);
  if (loading) return <CircularProgress />;
  const handleRemove = (itemId: string) => async () => {
    await deleteItem(itemId);
    loadItems();
  };
  const handleOrder = async () => {
    createOrder({
      items: items
        .filter((item: any) => item.selected)
        .map((item: any) => ({
          item: item._id,
          extras: item.extras
            .filter((extra: any) => extra.selected)
            .map((extra: any) => extra._id),
          quantity: 1,
        })),
    });
    router.push("/orders");
  };
  const selectItem = (i: number) => (e: any) => {
    const newItems = [...items];
    newItems[i].selected = e.target.checked;
    setItems(newItems);
  };
  const selectExtra = (itemIndex: number, extraIndex: number) => (e: any) => {
    const newItems = [...items];
    newItems[itemIndex].extras[extraIndex].selected = e.target.checked;
    setItems(newItems);
  };
  return (
    <Card>
      <CardHeader
        title="Items"
        action={
          <Stack direction={"row"}>
            <Link href={"/orders"}>
              <Button>Orders</Button>
            </Link>
            <Link href={"/items/create"}>
              <Button>Add</Button>
            </Link>
          </Stack>
        }
      />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any, i) => (
              <>
                <TableRow>
                  <TableCell>
                    <Checkbox value={item.selected} onChange={selectItem(i)} />
                  </TableCell>
                  <TableCell>
                    <img src={item.images[0]} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell align="right">
                    <Link href={`/items/create?itemId=${item._id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={handleRemove(item._id)}>Remove</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Card sx={{ w: "100%" }}>
                      <CardHeader title="Extras" />
                      <CardContent>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Extra select</TableCell>
                              <TableCell>Extra Name</TableCell>
                              <TableCell>Extra Price</TableCell>
                            </TableRow>
                          </TableHead>
                          {item.extras.map((extra: any, extraI: number) => (
                            <TableRow>
                              <TableCell>
                                <Checkbox
                                  checked={extra.selected}
                                  onChange={selectExtra(i, extraI)}
                                />
                              </TableCell>
                              <TableCell>{extra.name}</TableCell>
                              <TableCell>{extra.price}</TableCell>
                            </TableRow>
                          ))}
                        </Table>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Button onClick={handleOrder}>Place order</Button>
      </CardActions>
    </Card>
  );
};

export default ItemsPage;
