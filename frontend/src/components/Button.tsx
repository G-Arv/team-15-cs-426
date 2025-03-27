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
