import { List, ListItemButton, ListItemText } from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <List>
      <Link href={"/items"}>
        <ListItemButton>
          <ListItemText>Items</ListItemText>
        </ListItemButton>
      </Link>
      <Link href={"/orders"}>
        <ListItemButton>
          <ListItemText>Orders</ListItemText>
        </ListItemButton>
      </Link>
    </List>
  );
};

export default Home;
