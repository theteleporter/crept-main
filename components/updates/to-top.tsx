import { CaretUpIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";

export const ToTop = () => {
  return (
    <div className="fixed bottom-9 right-9 z-40">
      <Link href={"#"}>
        <Button title="To Top" className={"rounded-full"} size={"icon"} variant={"outline"}>
          <ArrowUpIcon className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};
