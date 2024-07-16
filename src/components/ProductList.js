import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct, logoutUser } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Button,
  CircularProgress,
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';
import { Delete, Edit, Add, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(state => state.products);

  useEffect(() => {
    console.log('Fetching products...');
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  useEffect(() => {
    console.log('Current products:', products);
  }, [products]);

  if (!products) {
    return (
      <Container component="main" maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Products</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button 
            component={Link} 
            to="/add" 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
          >
            Add Product
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="outlined" 
            color="secondary" 
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
        {products.length === 0 ? (
          <Typography>No products found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price} - Rating: {product.rating}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton component={Link} to={`/edit/${product._id}`} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product._id)} color="error">
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default ProductList;