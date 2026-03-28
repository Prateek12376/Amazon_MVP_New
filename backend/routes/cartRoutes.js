const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');

router.get('/:session_id', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/clear/:session_id', clearCart);
router.delete('/:id', removeFromCart);

module.exports = router;