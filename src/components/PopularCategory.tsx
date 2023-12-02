import { useSearchParams } from 'react-router-dom';
import { Badge } from './ui/badge';

const PopularCategory = ({ categories }: { categories: string[] }) => {
  const [, setSearchParams] = useSearchParams();
  return (
    <div className="flex flex-col gap-3">
      <h3>Popular Category</h3>
      <div className="flex w-full flex-wrap gap-3">
        {categories.map((category, idx) => (
          <Badge
            key={idx}
            className="cursor-pointer"
            onClick={() => {
              setSearchParams({ category: category });
            }}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
