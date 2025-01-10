import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/calendar";

interface RecurrenceSelectorProps {
  value: Event["recurrence"];
  onChange: (recurrence: Event["recurrence"]) => void;
}

export const RecurrenceSelector: React.FC<RecurrenceSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <Select
        value={value?.type}
        onValueChange={(type) =>
          onChange({
            type: type as "daily" | "weekly" | "monthly" | "yearly",
            interval: 1,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="No recurrence" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">No recurrence</SelectItem>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>

      {value?.type && (
        <>
          <div className="flex items-center gap-2">
            <span>Every</span>
            <Input
              type="number"
              min="1"
              className="w-20"
              value={value.interval}
              onChange={(e) =>
                onChange({
                  ...value,
                  interval: parseInt(e.target.value) || 1,
                })
              }
            />
            <span>{value.type}(s)</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Until</span>
            <Input
              type="date"
              value={value.endDate}
              onChange={(e) =>
                onChange({
                  ...value,
                  endDate: e.target.value,
                })
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
