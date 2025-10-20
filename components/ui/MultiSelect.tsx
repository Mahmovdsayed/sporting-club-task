"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
    options: { value: string; label: string }[];
    selected: string[];
    setSelected: (values: string[]) => void;
    placeholder?: string;
    label?: string;
}

export function MultiSelect({
    options,
    selected,
    setSelected,
    placeholder = "Select options",
    label,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const toggleValue = (value: string) => {
        if (selected.includes(value)) {
            setSelected(selected.filter((v) => v !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    return (
        <div className="w-full">
            {label && <label className="mb-2 block text-sm font-medium">{label}</label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                    >
                        {selected.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {selected.map((v) => {
                                    const opt = options.find((o) => o.value === v);
                                    return (
                                        <Badge key={v} variant="secondary">
                                            {opt?.label || v}
                                        </Badge>
                                    );
                                })}
                            </div>
                        ) : (
                            <span>{placeholder}</span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => toggleValue(option.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected.includes(option.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
