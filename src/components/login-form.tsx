import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="w-[380px]">
				<CardHeader>
					<CardTitle className="text-2xl">ログイン</CardTitle>
					<CardDescription>ログインして始めましょう</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						<Button
							variant="outline"
							className="w-full"
							onClick={async () => {
								"use server";
								await signIn("google", { redirectTo: "/" });
							}}
						>
							<FcGoogle className="mr-2 h-4 w-4" />
							Googleでログイン
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
