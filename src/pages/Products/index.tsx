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
import products from "../../mock-data/products.json";
import { ICartItem, IProduct } from "../../types/prodcts";

const Products = () => {
  const navigate = useNavigate();
  const handleAddToCart = (product: IProduct) => {
    const items = localStorage.getItem("cartItems");
    const cartItems: ICartItem[] = items ? JSON.parse(items) : [];
    const itemIndex: number =
      cartItems.findIndex((item) => item.id === product.id) ?? -1;
    if (itemIndex > -1) {
      cartItems[itemIndex].noOfItems = cartItems[itemIndex].noOfItems + 1;
    } else {
      const item: ICartItem = {
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        image: product.image,
        noOfItems: 1,
      };
      cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success(`${product.title} is added to cart.`);
  };

  return (
    <Container disableGutters maxWidth="lg">
      <Box
        display="flex"
        alignItems="right"
        marginY={3}
        justifyContent="space-between"
      >
        <h1>Products</h1>
        <Button
          variant="contained"
          sx={{ height: "50px" }}
          onClick={() => navigate("/cart")}
        >
          View Cart
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
            {products.map((row: IProduct) => {
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
                      color="warning"
                      onClick={() => handleAddToCart(row)}
                    >
                      Add to Cart
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            ;
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Products;
