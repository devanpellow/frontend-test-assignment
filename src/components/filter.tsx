import { Dispatch, SetStateAction } from "react";
import CatsDropdown from "./dropdown";
import CatsLimitSelect from "./select";

export const filter = ({
  selectedBreed,
  setSelectedBreed,
  selectedLimit,
  setSelectedLimit,
}: {
  selectedBreed: { name: string; id: string };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
  selectedLimit: { value: string; label: string };
  setSelectedLimit: Dispatch<SetStateAction<{ value: string; label: string }>>;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-4 items-center">
      <div className="w-3/4 md:w-72 z-50">
        <div className="my-3">
          <CatsDropdown
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
          />
        </div>
      </div>
      <div className="w-3/4 md:w-72 z-10">
        <div className="my-3">
          <CatsLimitSelect
            selectedLimit={selectedLimit}
            setSelectedLimit={setSelectedLimit}
          />
        </div>
      </div>
    </div>
  );
};

export default filter;
