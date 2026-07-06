import { Button } from "@/components/ui/button";

type FormActionsProps = {
  loading: boolean;
  editing: boolean;
  onCancel?: () => void;
};

export function FormActions({
  loading,
  editing,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        className="rounded-md bg-black px-5 py-2 text-white"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : editing
          ? "Update"
          : "Save"}
      </button>

      {editing && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
    </div>
  );
}