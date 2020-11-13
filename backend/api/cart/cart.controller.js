const redis = require("../services/redis");

const cartKey = (session) => `cart:${session}`;
const expireCartTime = process.env.EXPIRE_CART_TIME || 1800; // in seconds

const getCart = async (req, res) => {
  const { session } = req.params;

  const items = await redis.hgetall(cartKey(session));
  res.json({ success: true, items });
};

const addCartItem = async (req, res) => {
  const { session } = req.params;
  const { itemId, quantity } = req.body;
  const key = cartKey(session);

  const result = await redis.hset(key, itemId, quantity);

  // It was better that expire command runs with hset in only one command
  await redis.expire(key, expireCartTime);

  res.json({ success: !!result });
};

const updateCartItem = async (req, res, next, redis) => {
  const { session, itemId } = req.params;
  const { quantity } = req.body;
  const key = cartKey(session);

  const cartItem = await redis.hget(key, itemId);

  if (cartItem) {
    const result = await redis.hmset(cartKey(session), itemId, quantity);
    res.json({ success: !!result });
  } else {
    next();
  }
};

const deleteCartItem = async (req, res) => {
  const { session, itemId } = req.params;
  const result = await redis.hdel(cartKey(session), itemId);

  res.json({ success: !!result });
};

const clearCart = async (req, res) => {
  const { session } = req.params;
  const result = await redis.del(cartKey(session));

  res.json({ success: !!result });
};

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
