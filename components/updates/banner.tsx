import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Receipt } from "lucide-react";

export const Banner = () => {
  return (
    <>
      <div className="mx-5 md:mx-16 lg:mx-20 transition-all ease-out duration-700">
        <Link
          href={"https://www.support.crept.studio"}
          target={"_blank"}
        >
          <Alert className={"bg-gradient-to-br from-gray-900 to-pink-900 transition-all ease-out duration-700 shadow-sm border-none"}>
            <Receipt className="h-4 w-4" />
            <AlertTitle className="font-bold">Don&#39;t forget to support us</AlertTitle>
            <AlertDescription>
              We value your contribution to us. You can contribute to us through
              various channels.{" "}
              <span
                className={
                  "underline hover:no-underline transition-all ease-out duration-700 underline-offset-2"
                }
              >
                See more information here.
              </span>
            </AlertDescription>
          </Alert>
        </Link>
      </div>
    </>
  );
};
