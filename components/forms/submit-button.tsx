import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export function SubmitButton({
  children,
}: SubmitButtonProps) {
  return (
    <Button className="w-full">
      {children}
    </Button>
  );
}