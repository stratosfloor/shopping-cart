import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilites/formatCurrency';

type CartItemsProps = {
	id: number;
	quantity: number;
};

export function CartItem({ id, quantity }: CartItemsProps) {
	const { removeFromCart } = useShoppingCart();
	const item = storeItems.find((i) => i.id === id);
	if (item == null) return null;

	return (
		<Stack direction="horizontal" gap={2} className="d-flex align-items-center">
			<img
				src={item.imgUrl}
				style={{ width: '125px', height: '75px', objectFit: 'cover' }}
			/>
			<div className="me-auto">
				<div>
					{item.name}{' '}
					{quantity > 1 && (
						<span className="text-muted" style={{ fontSize: '.65rem' }}>
							{' '}
							x{quantity}
						</span>
					)}
				</div>
				<div>
					<span className="text-muted" style={{ fontSize: '.85rem' }}>
						{formatCurrency(item.price)}
					</span>
				</div>
			</div>
			<div>
				<span className="fs-6">{formatCurrency(item.price * quantity)}</span>
				<Button
					variant="outline-secondary"
					size="sm"
					onClick={() => removeFromCart(item.id)}
					style={{ margin: '.4rem' }}
				>
					&times;
				</Button>
			</div>
		</Stack>
	);
}
