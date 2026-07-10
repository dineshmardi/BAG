import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
};

export function CategoryCard({
  title,
  image,
}: Props) {
  return (
    <Link
      href={`/?category=${encodeURIComponent(
        title
      )}`}
    >
      <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-5 text-center">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}