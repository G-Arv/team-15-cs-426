declare module 'react-calendar' {
    import * as React from 'react';
  
    export interface CalendarProps {
      value?: Date | [Date, Date];
      onChange?: (value: Date | [Date, Date]) => void;
      // Add more props if needed
    }
  
    const Calendar: React.FC<CalendarProps>;
    export { Calendar };
  }
  