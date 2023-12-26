import React from "react";

export function KButton({
  id,
  onClick,
  type = "button",
  label = "Label",
  labelSize = "sm",
  btnColor = "blue-700",
  labelColor = "white",
  hoverColor = "blue-800",
  focusColor = "blue-300",
  rounded = "full",
  width = "full",
  margin = "",
  className = "",
}) {
  return (
    <div>
      <button
        id={id}
        onClick={onClick}
        type={type}
        className={`text-${labelColor} bg-${btnColor} hover:bg-${hoverColor} focus:ring-4 focus:outline-none focus:ring-${focusColor} font-medium rounded-${rounded} text-${labelSize} w-${width} sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-${btnColor} ${margin} ${className}`}
      >
        {label}
      </button>
    </div>
  );
}

export function KTextField({
  label = "label",
  maxLength,
  type = "text",
  id = "",
  name = id,
  placeholder = "placeholder",
  required = true,
  value,
  onChange,
  readOnly = false,
  spacing = "[0px]",
  actionElement,
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className={`${
          label === "" ? "hidden" : ""
        } block mb-2 text-sm font-medium text-gray-900`}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          type={type}
          id={id}
          name={name}
          maxLength={maxLength}
          className={`shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 tracking-${spacing}`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
        {actionElement === undefined ? (
          <></>
        ) : (
          <div className="ml-2">{actionElement}</div>
        )}
      </div>
    </div>
  );
}

export function KTextArea({
  label = "label",
  maxLength,
  rows = 3,
  type = "text",
  id = "",
  name = id,
  placeholder = "placeholder",
  required = true,
  readOnly = false,
  value,
  onChange,
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <textarea
        type={type}
        id={id}
        name={name}
        rows={rows}
        maxLength={maxLength}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
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
  onClick,
  isDropDownOpen,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <button
        onClick={onClick}
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
        id={id + "drop"}
        className={`${
          isDropDownOpen ? "absolute" : "hidden"
        } max-h-[250px] overflow-auto z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
      >
        <ul className="py-2 text-sm text-gray-700">{children}</ul>
      </div>
    </div>
  );
}

export function KDropdownItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full hover:bg-gray-50 py-2 px-4 text-start"
    >
      {label}
    </button>
  );
}

export function KGrid({
  crossAxisCount = 2,
  gap = 5,
  children,
  alignment = "center",
  margin = "mb-5",
}) {
  return (
    <div
      className={`md:grid md:grid-cols-${crossAxisCount} gap-${gap} items-${alignment} ${margin}`}
    >
      {children}
    </div>
  );
}

export function KFilePicker({ id, name, label, onChange }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 whitespace-nowrap"
      >
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={id}
        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full mb-5"
        onChange={onChange}
      />
    </div>
  );
}
