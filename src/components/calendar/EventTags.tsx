import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EventTagsProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
}

export const EventTags: React.FC<EventTagsProps> = ({
  selectedTags,
  onTagsChange,
  availableTags,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tags</label>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => onTagsChange(selectedTags.filter((t) => t !== tag))}
          >
            {tag}
            <span className="ml-1">×</span>
          </Badge>
        ))}
        <Popover>
          <PopoverTrigger>
            <Badge variant="outline">+ Add Tag</Badge>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {availableTags
                  .filter((tag) => !selectedTags.includes(tag))
                  .map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() => onTagsChange([...selectedTags, tag])}
                    >
                      {tag}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
