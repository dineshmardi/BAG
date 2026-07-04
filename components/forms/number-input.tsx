type NumberInputProps = {
  label: string;
  name: string;
  placeholder?: string;
};

export function NumberInput({
  label,
  name,
  placeholder,
}: NumberInputProps) {
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
        type="number"
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
      />
    </div>
  );
}