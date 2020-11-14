import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import api from "services/axios";

function checkExsitsItem(array, idItem) {
  return array.some((item) => item._id == idItem);
}

function handleCartToLocalStorage(newItem, type) {
  let localItemCart = localStorage.getItem("cart");
  localItemCart = localItemCart === null ? [] : JSON.parse(localItemCart);

  if (checkExsitsItem(localItemCart, newItem._id)) {
    const item = localItemCart.find((item) => item._id == newItem._id);
    type === "quantity" ? (item.quantity = newItem.quantity) : (item.checked = !item.checked);
    localStorage.setItem("cart", JSON.stringify(localItemCart));
    return false;
  }

  localItemCart.push({ _id: newItem._id, quantity: newItem.quantity, checked: newItem.checked });
  localStorage.setItem("cart", JSON.stringify(localItemCart));
  return true;
}

const updateCartReducer = (state, action) => {
  let { item, quantity = 1, checked = true } = action.payload;
  const newItem = { ...item };
  // hanlde min max items to add cart
  const rule = calculatePurchaseQuantity(newItem.inventory);
  if (quantity > rule || quantity < 1) {
    toast(`Quality must  > 1 and < ${rule}`);
    return;
  }

  // add properties for new item
  newItem.quantity = parseInt(quantity);

  if (checkExsitsItem(state.items, newItem._id)) {
    handleCartToLocalStorage(newItem, "quantity");
    const index = state.items.findIndex((item) => item._id === newItem._id);
    state.items[index] = newItem;
    toast("Update cart success");
    return;
  }
  newItem.checked = checked;
  handleCartToLocalStorage(newItem, "quantity");
  state.items.push(newItem);
  toast("Add cart success");
  return;
};

const handleCheckedReducer = (state, action) => {
  const item = state.items.find((item) => item._id == action.payload);
  handleCartToLocalStorage(item, "checked");
  item.checked = !item.checked;
};

export const getCart = createAsyncThunk("getCart", async (item, { dispatch, getState }) => {
  let localItemCart = localStorage.getItem("cart");
  if (localItemCart !== null) {
    localItemCart = JSON.parse(localItemCart);
    const objectIds = localItemCart.map((item) => item._id);
    let { data } = await api.get(`/api/product/get-price-for-products`, {
      params: { items: objectIds },
    });

    if (data) {     
      localItemCart.forEach((item, index) => {
        data[index].quantity = item.quantity;
        data[index].checked = item.checked;
      });     
    }

    dispatch(setCart(data));
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    updateCart: updateCartReducer,
    handleChecked: handleCheckedReducer,
    deleteItemCart: (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      }
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

const calculatePurchaseQuantity = (inventory) => {
  if (inventory <= 25) {
    return 1;
  } else if (inventory > 25 && inventory <= 100) {
    return 5;
  } else if (inventory > 100 && inventory < 500) {
    return 25;
  } else {
    return 50;
  }
};

export const { addDiscountSucces, updateCart, handleChecked, deleteItemCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
