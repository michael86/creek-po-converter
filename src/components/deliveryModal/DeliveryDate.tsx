import * as React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";

type Props = {
  value: dayjs.Dayjs | PickerValue;
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | PickerValue>>;
};

const DeliveryDate: React.FC<Props> = ({ value, setValue }) => {
  return (
    <DateTimePicker
      label="Date and time received"
      views={["year", "day", "hours", "minutes", "seconds"]}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      format="DD/MM/YYYY HH:mm"
    />
  );
};

export default DeliveryDate;
