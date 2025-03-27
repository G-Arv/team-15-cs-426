import { Button } from "./ui/button";

export function PrimaryButton({
	btnText,
	handleClick,
}: {
	btnText: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
	return (
		<Button
			variant="default"
			className="bg-primary text-text-light"
			onClick={handleClick}>
			{btnText}
		</Button>
	);
}
