type DeleteDialogProps = {
  onDelete: () => void;
};

export function DeleteDialog({
  onDelete,
}: DeleteDialogProps) {
  return (
    <button
      onClick={() => {
        if (
          confirm(
            "Are you sure you want to delete this item?"
          )
        ) {
          onDelete();
        }
      }}
      className="text-red-600"
    >
      Delete
    </button>
  );
}