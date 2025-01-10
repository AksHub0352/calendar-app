import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewEvent } from "../../../src/types/calendar";

interface EventDialogProps {
  open: boolean;
  selectedDate: Date | null;
  newEvent: NewEvent;
  onOpenChange: (open: boolean) => void;
  onEventChange: (event: NewEvent) => void;
  onSave: () => void;
}

export const EventDialog: React.FC<EventDialogProps> = ({
  open,
  selectedDate,
  newEvent,
  onOpenChange,
  onEventChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(!open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedDate ? selectedDate.toLocaleDateString() : ""}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              onEventChange({ ...newEvent, title: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="time"
              value={newEvent.startTime}
              onChange={(e) =>
                onEventChange({ ...newEvent, startTime: e.target.value })
              }
            />
            <Input
              type="time"
              value={newEvent.endTime}
              onChange={(e) =>
                onEventChange({ ...newEvent, endTime: e.target.value })
              }
            />
          </div>

          <Input
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              onEventChange({ ...newEvent, description: e.target.value })
            }
          />

          <Select
            value={newEvent.color}
            onValueChange={(value) =>
              onEventChange({ ...newEvent, color: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue (Work)</SelectItem>
              <SelectItem value="green">Green (Personal)</SelectItem>
              <SelectItem value="purple">Purple (Other)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Add Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
