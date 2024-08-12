"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { BellIcon } from "@radix-ui/react-icons";
import {
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenu,
} from "@/components/ui/nav-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { Badge } from "@nextui-org/react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { notificationsFetcher } from "./fetchers";
import { Notification } from "./types";
import { Button } from "@/components/ui/button";

const NotificationsDisplay = () => {
  const {
    data: notifications,
    error: notificationsError,
    isLoading: notificationsLoading,
  } = useSWR("/api/notifications", notificationsFetcher);

  if (notificationsError) {
    console.error("Error fetching notifications data:", notificationsError);
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Badge
              content={notifications?.length || 0}
              color={notifications && notifications.length > 0 ? 'primary' : 'secondary'}
              placement="top-right"
              size="sm"
              variant="solid"
              shape="circle"
              showOutline={false}
            >
              <BellIcon className="w-4 h-4 mx-1" />
            </Badge>
          </NavigationMenuTrigger>
          {notifications && notifications.length > 0 && (
            <NavigationMenuContent className="text-start pb-5">
              <h2 className="mt-4 mb-2 mx-5 font-semibold text-base">
                Notifications
              </h2>
              <ScrollArea className="h-60 lg:h-56">
                <ul className="grid gap-3 pb-4 px-3 w-60 grid-col-1 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
                  <Separator className="bg-accent/30 lg:hidden" />
                  {notificationsLoading ? (
                    [...Array(10)].map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-28 rounded-md"></Skeleton>
                        <Separator className="bg-accent/30 lg:hidden" />
                      </div>
                    ))
                  ) : (
                    notifications.map((notification, index) => (
                      <div key={index}>
                        <ListItem
                          href={notification.url}
                          title={notification.title}
                        >
                          <div className="lg:flex lg:gap-2 lg:items-center">
                            <div className="lg:w-full lg:max-w-[150px]">
                              <Image
                                className="w-full h-full my-2 aspect-video"
                                as={NextImage}
                                unoptimized
                                loading="eager"
                                priority={true}
                                src={notification.imgUrl}
                                alt={notification.imgTitle}
                                width={0}
                                height={0}
                                quality={100}
                                radius={"sm"}
                              />
                            </div>
                            <div>{notification.description}</div>
                          </div>
                        </ListItem>
                        <Separator className="bg-accent/30 lg:hidden" />
                      </div>
                    ))
                  )}
                </ul>
              </ScrollArea>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default NotificationsDisplay;