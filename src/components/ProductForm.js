import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { addProduct, updateProduct, fetchProduct } from '../redux/actions';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: true
  });
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProduct = useSelector(state => state.currentProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct && id) {
      setProduct(currentProduct);
    }
  }, [currentProduct, id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateProduct(id, product));
      } else {
        await dispatch(addProduct(product));
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {id ? 'Edit Product' : 'Add Product'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type"
            name="type"
            value={product.type}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="rating"
            label="Rating"
            name="rating"
            type="number"
            value={product.rating}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="warranty_years"
            label="Warranty Years"
            name="warranty_years"
            type="number"
            value={product.warranty_years}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {id ? 'Update Product' : 'Add Product'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductForm;