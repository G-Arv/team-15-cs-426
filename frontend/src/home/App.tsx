import "./App.css";
import NavBar from "../components/NavBar";
import "./App.css";
import { LongButton, PrimaryButton } from "@/components/Button";

function App() {
	// const [count, setCount] = useState(0)

	return (
		<>
			<header>Home Page</header>
			<NavBar />
			<LongButton btnText="some button" handleClick={undefined}></LongButton>
		</>
	);
}

export default App;
