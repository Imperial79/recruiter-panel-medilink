import React, { useState } from "react";

export function KTextField({
  label = "label",
  maxLength,
  type = "text",
  id,
  name,
  placeholder = "placeholder",
  required = true,
  value,
  onChange,
  readOnly = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        maxLength={maxLength}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

export function KTextArea({
  label = "label",
  maxLength,
  rows = 3,
  type = "text",
  id,
  name,
  placeholder = "placeholder",
  required = true,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        type={type}
        id={id}
        name={name}
        rows={rows}
        maxLength={maxLength}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function KDropDown({
  id,
  dropdownId,
  label,
  value,
  handleDropdownChange,
  isDropDownOpen,
  children,
}) {
  // const [isDropOpen, setisDropOpen] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <button
        onClick={() => {
          // setisDropOpen(!isDropOpen);
          handleDropdownChange(id, !isDropDownOpen[id]);
        }}
        id={id}
        className={`shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 inline-flex items-center justify-between`}
        type="button"
      >
        {value}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id={dropdownId}
        className={`${
          isDropDownOpen[id] ? "hidden" : "absolute"
        } max-h-[250px] overflow-auto z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
      >
        <ul className="py-2 text-sm text-gray-700">{children}</ul>
      </div>
    </div>
  );
}

export function KFilePicker({ id, name, label }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={id}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full mb-5"
      />
    </div>
  );
}
