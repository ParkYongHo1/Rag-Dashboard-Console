import { formatDate } from "@/utils/dateFormatter";
import date from "@/assets/stats/date.svg";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface dateSelectorProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateSelector = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isCalendarOpen,
  setIsCalendarOpen,
}: dateSelectorProps) => {
  const datePickerRef = useRef(null);

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      if (date > endDate) {
        setEndDate(date);
      }
      setIsCalendarOpen(false);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
      setIsCalendarOpen(false);
    }
  };

  const handleDateIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <>
      <div className="flex items-center border px-4 py-2 rounded-md border-gray-300 bg-white text-gray-700">
        <span>
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </span>
        <img
          src={date}
          onClick={handleDateIconClick}
          className="cursor-pointer ml-3 w-5 h-5 object-contain"
          alt="날짜 선택"
        />
      </div>
      {isCalendarOpen && (
        <div
          className="flex gap-2 absolute top-full mt-2 z-20 bg-white shadow-lg rounded-md p-2"
          ref={datePickerRef}
        >
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            selectsStart
            startDate={startDate}
            endDate={endDate}
            inline
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            minDate={startDate}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            inline
          />
        </div>
      )}
    </>
  );
};

export default DateSelector;
