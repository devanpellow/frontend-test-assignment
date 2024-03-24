import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";

export interface BaseSelectProps {
  label?: string;
  options: { value: string; label: string }[];
  selectedOption: { value: string; label: string };
  onChange: (option: { value: string; label: string }) => void;
}

export const BaseSelect = ({
  label,
  options,
  selectedOption,
  onChange,
}: BaseSelectProps) => {
  return (
    <div className="w-full z-auto">
      <Listbox value={selectedOption} onChange={onChange}>
        <div className="relative mt-1">
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-white">
              {label}
            </Listbox.Label>
          )}
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 focus:ring-transparent sm:text-sm">
            <span className="block truncate">{selectedOption.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-simbase-blue py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-simbase-blue text-white dark:bg-simbase-orange/65"
                        : "text-black dark:text-white"
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active
                              ? " text-white dark:text-simbase-blue"
                              : "text-simbase-blue dark:text-simbase-orange"
                          }`}
                        >
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
