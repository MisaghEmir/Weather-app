import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState, Fragment } from "react";
import data from "../data/City.json";

type Person = {
  name: string;
  lat: number;
  lon: number;
};

type Props = {
  value: string | null;
  handleChange: (value: string) => void;
};

export default function Example({ value, handleChange }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(data[0]);

  const filteredPeople =
    query === ""
      ? data
      : data.filter((data) => {
          return data?.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="w-full py-16 px-10 pb-8 text-white">
      <Combobox
        value={selected}
        onChange={(value: Person) => {
          handleChange(value?.name);
          setSelected(value);
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden  text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/5 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm p-2 border-b border-gray-400">
            <Combobox.Input
              className="w-full  bg-transparent outline-none relative border-none py-2 pl-3 pr-10 p-5 border-b text-sm leading-5  focus:ring-0"
              displayValue={(person: Person) => person?.name}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-textSecond_300"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => handleChange("")}
          >
            <Combobox.Options className="absolute py-2 pb-4 backdrop-blur-3xl transt font-bold bg-[#B3A298]/90 max-h-60 w-full notscroll overflow-auto rounded-b-xl  text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-textSecond_300">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative font-bold  cursor-default select-none py-2 pl-10 pr-4  ${
                        active
                          ? "bg-cyan-900 text-white"
                          : " bg-background_body text-textSecond_400"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate  ${
                            selected ? "font-bold" : "font-bold"
                          }`}
                        >
                          {person?.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 z-[9999999999] left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-cyan-900"
                            }`}
                          >
                            <CheckIcon
                              className="h-5 w-5 z-50"
                              aria-hidden="true"
                            />
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
    </div>
  );
}
