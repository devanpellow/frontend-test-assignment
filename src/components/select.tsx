import { Dispatch, SetStateAction } from "react";
import { fetchLimits } from "../helpers";
import { BaseSelect } from "./ui/BaseSelect";

const CatsLimitSelect = ({
  selectedLimit,
  setSelectedLimit,
}: {
  selectedLimit: { value: string; label: string };
  setSelectedLimit: Dispatch<SetStateAction<{ value: string; label: string }>>;
}) => {
  return (
    <BaseSelect
      label="Select a limit"
      options={fetchLimits}
      selectedOption={selectedLimit}
      onChange={setSelectedLimit}
    />
  );
};

export default CatsLimitSelect;
