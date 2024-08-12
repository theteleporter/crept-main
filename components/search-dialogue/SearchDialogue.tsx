"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, MouseEventHandler } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { CommandDialog } from "@/components/ui/command";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/nav-menu";
import NotificationsDisplay from "./NotificationsDisplay";
import SearchInput from "./SearchInput";

import { Item } from "./types";


export function SearchDialogue() {
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            // search submissions handled here
        }
    };

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open); // Toggle the dialog on Ctrl+K or Cmd+K
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);
    return (
        <div>
            <div className="flex gap-2 items-center mx-2 md:mx-3">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NotificationsDisplay />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                {/* Search Input */}
                <Button
                    onClick={
                        setOpen as unknown as MouseEventHandler<HTMLButtonElement>
                    }
                    variant="ghost"
                    className="bg-none flex gap-1 py-0 px-2 md:px-1"
                >
                    <div className="text-sm text-muted-foreground hidden md:block">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground opacity-100 pt-1">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                    <MagnifyingGlassIcon className="w-5 h-5" />
                </Button>
                <SearchInput 
                    open={open} 
                    setOpen={setOpen} 
                    inputRef={inputRef} 
                    handleKeyDown={handleKeyDown} 
                />
            </div>
        </div>
    );
}
