import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ICartItem } from "../../types/prodcts";

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let items = localStorage.getItem("cartItems");
    const cartItems = items ? JSON.parse(items) : [];
    setItems([...cartItems]);
  }, []);

  useEffect(() => {
    const item = [...items];
    const totalPrice = item.reduce((a: number, item: ICartItem) => {
      return a + item.price * item.noOfItems;
    }, 0);
    setTotal(totalPrice);
  }, [items]);

  const addItem = (product: ICartItem) => {
    let cartItems = [...items];
    const itemIndex: number =
      cartItems.findIndex((item) => item.id === product.id) ?? -1;
    if (itemIndex > -1) {
      cartItems[itemIndex].noOfItems = cartItems[itemIndex].noOfItems + 1;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setItems([...cartItems]);
    toast.success(`${product.title} is added to cart.`);
  };

  const removeItem = (product: ICartItem) => {
    let cartItems = [...items];
    const itemIndex: number =
      cartItems.findIndex((item) => item.id === product.id) ?? -1;
    if (itemIndex > -1) {
      cartItems[itemIndex].noOfItems = cartItems[itemIndex].noOfItems - 1;
      if (cartItems[itemIndex].noOfItems <= 0) {
        cartItems.splice(itemIndex, 1);
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setItems([...cartItems]);
    toast.success(`${product.title} is removed from cart.`);
  };

  return (
    <Container>
      <Box
        display="flex"
        alignItems="right"
        marginY={3}
        justifyContent="space-between"
      >
        <h1>Your items</h1>
        <Button
          variant="contained"
          sx={{ height: "50px" }}
          onClick={() => navigate("/")}
        >
          Back to Shopping
        </Button>
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              <>
                {items.map((row: ICartItem) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        <img
                          src={row.image}
                          height="30"
                          width="30"
                          style={{ marginLeft: "10px" }}
                          alt="product"
                        />
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => removeItem(row)}
                          title="Remove Item"
                        >
                          -
                        </Button>
                        <span style={{ padding: "0px 10px" }}>
                          {row.noOfItems} items
                        </span>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => addItem(row)}
                          title="Add Item"
                        >
                          +
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "right" }}>
                    Total: {total} Rs.
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>No items in cart</TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Cart;
