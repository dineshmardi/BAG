type TextAreaProps = {
  label: string;
  name: string;
  placeholder?: string;
};

export function TextArea({
  label,
  name,
  placeholder,
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
      />
    </div>
  );
}