import React from 'react';
import RecipeCard, { RecipeData } from './RecipeCard';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Heart, Trash2 } from 'lucide-react';

interface RecipeListProps {
  recipes: RecipeData[];
  onRecipeClick: (id: string) => void;
  onFilterClick: () => void;
  isLoading?: boolean;
  favoriteRecipes?: string[];
  onToggleFavorite?: (id: string) => void;
  onDeleteRecipe?: (id: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  onRecipeClick,
  onFilterClick,
  isLoading = false,
  favoriteRecipes = [],
  onToggleFavorite,
  onDeleteRecipe
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kitchen-green"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recipe Ideas</h2>
          <Button 
            variant="outline" 
            onClick={onFilterClick}
            className="border-kitchen-green text-kitchen-green hover:bg-kitchen-green hover:text-white"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      {recipes.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg border border-muted">
          <p className="text-gray-500 mb-4">No recipes found with your current ingredients.</p>
          <p className="text-gray-500 mb-4">Try adding more items to your pantry!</p>
        </div>
      ) : (
        <div className="space-y-3">
        {recipes.map(recipe => (
          <div key={recipe.id} className="relative group">
            <RecipeCard
              recipe={recipe}
              onClick={onRecipeClick}
              isFavorite={favoriteRecipes?.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(recipe.id) : undefined}
              onDelete={onDeleteRecipe ? () => onDeleteRecipe(recipe.id) : undefined}
            />
            <div className="absolute top-2 right-3 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition">
              {onToggleFavorite && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onToggleFavorite(recipe.id);
                  }}
                  aria-label={favoriteRecipes?.includes(recipe.id) ? "Remove favorite" : "Add favorite"}
                  className={"rounded-full p-1 shadow bg-white hover:bg-kitchen-green/5"}
                >
                  <Heart size={18} className={favoriteRecipes?.includes(recipe.id) ? "text-red-500 fill-current" : "text-gray-400"} />
                </button>
              )}
              {onDeleteRecipe && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDeleteRecipe(recipe.id);
                  }}
                  aria-label="Delete recipe"
                  className="rounded-full p-1 shadow bg-white hover:bg-red-100"
                >
                  <Trash2 size={18} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
