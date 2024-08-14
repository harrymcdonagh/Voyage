import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
  status: number | null;
  message: string | null;
};

export default function RegistrationDialog({ open, onClose, status, message }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {status === 200 && (
        <DialogContent className="sm:max-w-[425px]">
          <VisuallyHidden>
            <DialogTitle>Registration Successful</DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col items-center justify-center gap-6 py-8">
            <CircleCheckIcon className="h-12 w-12 text-green-500" />
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-bold">Registration Successful!</h3>
              <p className="text-muted-foreground">
                Welcome to Voyage! The future of Finance...
              </p>
            </div>
            <DialogFooter>
              <div>
                <Link href="/api/auth/signin">
                  <Button type="button">Sign in!</Button>
                </Link>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      )}

      {status === 400 && (
        <DialogContent className="sm:max-w-[425px]">
          <VisuallyHidden>
            <DialogTitle>Registration Failed</DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col items-center justify-center gap-6 py-8">
            <CircleCheckIcon className="h-12 w-12 text-red-500" />
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-bold">Registration Failed</h3>
              <p className="text-muted-foreground">
                Unfortunately, we couldn&apos;t register your account due to the following
                issue:
              </p>
              <p className="text-muted-foreground">{message}</p>
            </div>
            <DialogFooter>
              <div>
                <Button type="button" onClick={onClose}>
                  Retry
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      )}

      {status === 500 && (
        <DialogContent className="sm:max-w-[425px]">
          <VisuallyHidden>
            <DialogTitle>Server Error</DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col items-center justify-center gap-6 py-8">
            <CircleCheckIcon className="h-12 w-12 text-red-500" />
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-bold">Server Error</h3>
              <p className="text-muted-foreground">
                An unexpected error occurred. Please try again.
              </p>
            </div>
            <DialogFooter>
              <div>
                <Button type="button" onClick={onClose}>
                  Retry
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
