import { Combobox, Transition } from "@headlessui/react";
import { useState } from "react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { Fragment } from "react/jsx-runtime";

export interface BaseDropdownProps {
  values: { name: string; id: string }[];
  label?: string;
  selectedValue: { name: string; id: string };
  setSelectedValue: (value: { name: string; id: string }) => void;
}

export const BaseDropdown = ({
  values,
  label,
  setSelectedValue,
  selectedValue,
}: BaseDropdownProps) => {
  const [searchString, setSearchString] = useState("");
  const filteredValues =
    searchString === ""
      ? values
      : values.filter((value) => {
          return value.name.toLowerCase().includes(searchString.toLowerCase());
        });

  return (
    <Combobox value={selectedValue} onChange={setSelectedValue}>
      <div className="relative mt-1">
        {label && (
          <Combobox.Label className="block text-sm font-medium text-gray-700 dark:text-white">
            {label}
          </Combobox.Label>
        )}
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-simebase-blue dark:focus-visible:ring-offset-simebase-orange focus:ring-transparent sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-1 rounded-lg "
            displayValue={(value: { name: string; id: string }) => value.name}
            onChange={(event) => setSearchString(event.target.value)}
          />
          <Combobox.Button
            data-testid="dropdown-input-btn"
            className="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setSearchString("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-simbase-blue py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredValues?.length === 0 && searchString !== "" ? (
              <div className="relative cursor-pointer select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredValues?.map((value) => (
                <Combobox.Option
                  data-testid={`dropdown-option-${value.name}`}
                  key={value.name}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-simbase-blue dark:bg-simbase-orange/65 text-white"
                        : "text-gray-900 dark:text-white"
                    }`
                  }
                  value={value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {value.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active
                              ? "text-white dark:text-simbase-blue"
                              : "text-simbase-blue dark:text-simbase-orange"
                          }`}
                        >
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
