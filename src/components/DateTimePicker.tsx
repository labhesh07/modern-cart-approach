
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
  const [selectedTime, setSelectedTime] = React.useState<string>("12:00");

  // Update the date with the selected time
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (date) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      setDate(newDate);
    }
  };

  // When a date is selected, preserve the current time
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      newDate.setHours(hours, minutes);
    }
    setDate(newDate);
  };

  // Generate time options in 30-minute intervals
  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let hour = 9; hour <= 20; hour++) {
      options.push(`${hour}:00`);
      options.push(`${hour}:30`);
    }
    return options;
  }, []);

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            disabled={(date) => date < new Date()}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedTime && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {selectedTime || <span>Select time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <div className="max-h-[300px] overflow-y-auto p-2">
            {timeOptions.map((time) => (
              <Button
                key={time}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  selectedTime === time && "bg-primary/10"
                )}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
