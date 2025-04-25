import { useState } from 'react';
import { RecipeListPage } from './pages/RecipeListPage';
import RecipePage from './pages/RecipePage';
import { data } from './utils/data';
import { Box } from '@chakra-ui/react';

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <Box bg="gray.100" minH="100vh" p={4}>
      {selectedRecipe ? (
        <RecipePage recipe={selectedRecipe} onGoBack={handleBack} />
      ) : (
        <RecipeListPage
          recipes={data.hits}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectRecipe={handleRecipeSelect}
        />
      )}
    </Box>
  );
};