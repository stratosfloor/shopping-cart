import { ReactNode, createContext, useContext, useState } from 'react';

type ShoppingCartProverProps = {
	children: ReactNode;
};

type CartItem = {
	id: number;
	quantity: number;
};

type ShoppingCartContext = {
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
};

const ShoppingarCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
	return useContext(ShoppingarCartContext);
}

export function ShoppingarCartProvider({ children }: ShoppingCartProverProps) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const getItemQuantity = (id: number): number => {
		return cartItems.find((item) => id === item.id)?.quantity || 0;
	};

	const increaseCartQuantity = (id: number): void => {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => id === item.id) == null) {
				return [...currentItems, { id, quantity: 1 }];
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseCartQuantity = (id: number): void => {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => id === item.id)?.quantity === 1) {
				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeFromCart = (id: number): void => {
		setCartItems((currentItems) => {
			return currentItems.filter((item) => item.id !== id);
		});
	};

	return (
		<ShoppingarCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
			}}
		>
			{children}
		</ShoppingarCartContext.Provider>
	);
}