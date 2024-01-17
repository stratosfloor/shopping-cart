import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { About } from './pages/About';

function App() {
	return (
		<main className="flex flex-col items-center mb-4">
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/store" element={<Store />}></Route>
				<Route path="/about" element={<About />}></Route>
			</Routes>
		</main>
	);
}

export default App;
