import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from '../utilites/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
	} = useShoppingCart();

	const quantity = getItemQuantity(id);

	return (
		<Card className="h-100">
			<Card.Img
				variant="top"
				src={imgUrl}
				height="200px"
				style={{ objectFit: 'cover' }}
			/>
			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
					<span className="fs-2">{name}</span>
					<span className="ms-2 text-muted">{formatCurrency(price)}</span>
				</Card.Title>
				<div className="mt-auto d-flex justify-content-center">
					{quantity === 0 ? (
						<Button className="w-50" onClick={() => increaseCartQuantity(id)}>
							+ Add to cart
						</Button>
					) : (
						<div
							className="d-flex align-items-center flex-column"
							style={{ gap: '.5rem' }}
						>
							<div
								className="d-flex align-items center justify-content-center"
								style={{ gap: '.5rem' }}
							>
								<Button
									className="d-flex justify-content-center align-items-center"
									style={{ width: '2rem', height: '2rem' }}
									onClick={() => decreaseCartQuantity(id)}
								>
									-
								</Button>
								<div>
									<span className="fs-3">{quantity}</span> in cart
								</div>
								<Button
									className="d-flex justify-content-center align-items-center"
									style={{ width: '2rem', height: '2rem' }}
									onClick={() => increaseCartQuantity(id)}
								>
									+
								</Button>
							</div>
							<Button
								variant="outline-danger"
								size="sm"
								onClick={() => removeFromCart(id)}
							>
								<span>Remove</span>
							</Button>
						</div>
					)}
				</div>
			</Card.Body>
		</Card>
	);
}
