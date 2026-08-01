import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/category/category-card";
import { Reveal } from "@/components/ui/reveal";

export function CategoriesGrid() {
  return (
    <section id="categorias" className="container py-24">
      <Reveal>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-neon-blueSoft mb-3">
              Explore
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl">
              Categorias em destaque
            </h2>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, i) => (
          <CategoryCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </section>
  );
}
