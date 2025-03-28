import { ReactNode } from "react";
import { Button } from "./ui/button";

export function PrimaryButton({
	btnText,
	handleClick,
}: {
	btnText: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
	return (
		<Button variant="default" onClick={handleClick}>
			{btnText}
		</Button>
	);
}

export function LongButton({
	btnText,
	handleClick,
}: {
	btnText: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
	return (
		<Button
			className="w-32 md:w-48 lg:w-64 h-10"
			variant="default"
			onClick={handleClick}>
			{btnText}
		</Button>
	);
}

export function SquareButton({
	icon,
	handleClick,
}: {
	icon: ReactNode;
	handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
	return (
		<Button variant="default" size="icon" onClick={handleClick}>
			{icon}
		</Button>
	);
}
