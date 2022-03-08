import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";
interface OrderState {
    loading: boolean;
    error: string | null;
    currentOrder: any;
}

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null,

}
export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (paramaters: { jwt: string, orderId: string }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/orders/${paramaters.orderId}/placeOrder`
            , null, {
            headers: {
                Authorization: `bearer ${paramaters.jwt}`
            }
        });
        return data;
    }
)

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    }, extraReducers: {
        [placeOrder.pending.type]: (state) => {
            //return {...state, loading:true};
            state.loading = true;
        },
        [placeOrder.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.currentOrder = action.payload;
            state.error = null;
        },
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkout.pending.type]: (state) => {
            //return {...state, loading:true};
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.currentOrder = action.payload;
            state.error = null;
        },
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})