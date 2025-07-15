import DatePicker from "react-datepicker";

function DateInput({ label, selected, setSelected }) {
    return (
      <div className="flex flex-col space-y-1">
        <label className="text-lg font-medium text-gray-900">{label}</label>
        <DatePicker
          selected={selected}
          onChange={(date) => setSelected(date)}
          showTimeSelect
          timeFormat="hh:mm aa"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy, hh:mm aa"
          placeholderText="Select Date & Time"
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
        />
      </div>
    );
  }
  export default DateInput;