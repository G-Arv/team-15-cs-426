import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../../public/vite.svg";
import "./App.css";
import { PrimaryButton } from "@/components/Button";

function App() {
	return (
		<div>
			<PrimaryButton
				btnText="some button"
				handleClick={undefined}></PrimaryButton>
		</div>
	);
}

export default App;
