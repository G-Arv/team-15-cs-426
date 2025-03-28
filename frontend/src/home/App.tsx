import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../../public/vite.svg";
import "./App.css";
import { LongButton, PrimaryButton } from "@/components/Button";

function App() {
	return (
		<div>
			<LongButton btnText="some button" handleClick={undefined}></LongButton>
		</div>
	);
}

export default App;
