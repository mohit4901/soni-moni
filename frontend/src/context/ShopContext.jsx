import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// ✅ LOCAL PRODUCTS (fallback only)
import { products as localProducts } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';

    const SHIPPING_CHARGES = {
        india: 100
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [shippingRegion, setShippingRegion] = useState("india");

    // ✅ NEW (logic only)
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const navigate = useNavigate();
    const delivery_fee = SHIPPING_CHARGES[shippingRegion];

    // ---------------- CART LOGIC (UNCHANGED) ----------------

    const addToCart = async (itemId, size) => {
        const product = products.find(p => p._id === itemId);

        if (product?.sizes?.length > 0 && !size) {
            toast.error('Select Product Size');
            return;
        }

        const finalSize = product?.sizes?.length > 0 ? size : "default";

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][finalSize]
                ? cartData[itemId][finalSize]++
                : cartData[itemId][finalSize] = 1;
        } else {
            cartData[itemId] = { [finalSize]: 1 };
        }

        setCartItems(cartData);

        if (token) {
            await axios.post(
                backendUrl + '/api/cart/add',
                { itemId, size: finalSize },
                { headers: { token } }
            );
        }
    };

    const getCartCount = () => {
        let total = 0;
        for (const i in cartItems) {
            for (const s in cartItems[i]) {
                total += cartItems[i][s];
            }
        }
        return total;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            await axios.post(
                backendUrl + '/api/cart/update',
                { itemId, size, quantity },
                { headers: { token } }
            );
        }
    };

    const getCartAmount = () => {
        let total = 0;
        for (const id in cartItems) {
            const product = products.find(p => p._id === id);
            if (!product) continue;
            for (const s in cartItems[id]) {
                total += product.price * cartItems[id][s];
            }
        }
        return total;
    };

    // ---------------- PRODUCTS FETCH ----------------

    const getProductsData = async () => {
        try {
            const res = await axios.get(
                backendUrl + '/api/product/list',
                { params: { category, subCategory } }
            );

            if (res.data.success) {
                setProducts(res.data.products.reverse());
            }
        } catch {
            setProducts(localProducts); // fallback
        }
    };

    useEffect(() => {
        getProductsData();
    }, [category, subCategory]);

    // ---------------- USER CART ----------------

    const getUserCart = async (token) => {
        const res = await axios.post(
            backendUrl + '/api/cart/get',
            {},
            { headers: { token } }
        );
        if (res.data.success) {
            setCartItems(res.data.cartData);
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            getUserCart(savedToken);
        }
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        shippingRegion,
        setShippingRegion,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,

        // ✅ exposed for existing UI
        category,
        setCategory,
        subCategory,
        setSubCategory
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

