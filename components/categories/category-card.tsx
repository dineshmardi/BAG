import Link from "next/link";

type Props = {
  title: string;
};

const gradients = [
  "from-amber-200 to-amber-400",
  "from-rose-200 to-rose-400",
  "from-sky-200 to-sky-400",
  "from-emerald-200 to-emerald-400",
  "from-violet-200 to-violet-400",
  "from-orange-200 to-orange-400",
];

const icons = [
  "👜",
  "🎒",
  "💼",
  "🧳",
  "👝",
  "🎁",
];

export function CategoryCard({
  title,
}: Props) {
  const index =
    title.length %
    gradients.length;

  return (
    <Link
      href={`/?category=${encodeURIComponent(
        title
      )}`}
    >
      <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

        <div
          className={`flex aspect-square items-center justify-center bg-gradient-to-br ${gradients[index]}`}
        >
          <span className="text-7xl transition-transform duration-500 group-hover:scale-110">
            {icons[index]}
          </span>
        </div>

        <div className="p-5 text-center">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Explore Collection
          </p>
        </div>
      </div>
    </Link>
  );
}