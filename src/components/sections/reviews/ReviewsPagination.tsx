interface ReviewsPaginationProps {
  pages: number;
  active: number;
  setActive: (i: number) => void;
}

const ReviewsPagination = ({ pages, active, setActive }: ReviewsPaginationProps) => {
  return (
    <div className="flex justify-center gap-1 mt-8">
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          aria-label={`Страница отзывов ${i + 1} из ${pages}`}
          aria-current={i === active ? "true" : undefined}
          className="p-3 group"
        >
          <span
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-accent" : "w-2 bg-accent/20 group-hover:bg-accent/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default ReviewsPagination;
