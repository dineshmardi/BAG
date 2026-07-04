type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export function TextInput({
  label,
  name,
  type = "text",
  placeholder,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
      />
    </div>
  );
}