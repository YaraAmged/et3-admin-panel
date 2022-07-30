import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Stack,
  Switch,
  Table,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createItem, getItem, updateItem } from "../../api/items";
import { serialize } from "object-to-formdata";
const CreateItemPage: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    price: 0,
    extras: [] as any,
    images: [] as any,
    active: true,
  });
  const loadItem = async () => {
    const item = await getItem(router.query.itemId as string);
    setState(item);
  };
  useEffect(() => {
    if (router.query.itemId) loadItem();
  }, []);
  const addExtra = () =>
    setState({ ...state, extras: [...state.extras, { name: "", price: 0 }] });
  const removeExtra = (i: number) => () =>
    setState({
      ...state,
      extras: state.extras.filter((e: any, index: number) => index != i),
    });
  const changeExtra = (i: number) => (e: any) => {
    const extras = [...state.extras];
    extras[i][e.target.name] = e.target.value;
    setState({ ...state, extras });
  };
  const handleSave = async () => {
    const data = serialize(state, { indices: true });
    if (router.query.itemId)
      await updateItem(router.query.itemId as string, data);
    else await createItem(data);
    router.push("/items");
  };
  return (
    <Card sx={{ width: 600 }}>
      <CardContent>
        <Stack rowGap={5}>
          <TextField
            label={"Name"}
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
          <TextField
            label={"Price"}
            value={state.price}
            type="number"
            onChange={(e) => setState({ ...state, price: +e.target.value })}
          />
          <FormControlLabel
            label="Active"
            control={<Switch />}
            value={state.active}
            onChange={(e, active) => setState({ ...state, active })}
          />

          <Button component="label">
            Images{" "}
            <input
              type={"file"}
              hidden
              onChange={(e) =>
                e.target.files &&
                setState({ ...state, images: Array.from(e.target.files) })
              }
            />
          </Button>
          {state.images.map((image) => image.name)}
          <Card>
            <CardHeader
              title="Extras"
              action={<Button onClick={addExtra}>Add</Button>}
            />
            <CardContent>
              <Table>
                {state.extras.map((extra: any, i: number) => (
                  <TableRow>
                    <TableCell>
                      <TextField
                        label={"Name"}
                        value={extra.name}
                        name="name"
                        onChange={changeExtra(i)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label={"Price"}
                        type="number"
                        value={extra.price}
                        name="price"
                        onChange={changeExtra(i)}
                      />
                    </TableCell>

                    <TableCell>
                      <Button onClick={removeExtra(i)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={handleSave}>
          {router.query.itemId ? "Update" : "Create"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateItemPage;
