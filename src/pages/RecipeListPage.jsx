import { Box, Input, Grid, Text, Image, Heading, VStack, Container, Badge } from '@chakra-ui/react';
import { useMemo } from 'react';

export const RecipeListPage = ({ recipes, onSelectRecipe, searchTerm, onSearchChange }) => {
  const filteredRecipes = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return recipes.filter(({ recipe }) => {
      // Search by recipe name, health labels, or diet labels
      return (
        recipe.label.toLowerCase().includes(term) ||
        recipe.healthLabels.some(label => label.toLowerCase().includes(term)) ||
        recipe.dietLabels.some(label => label.toLowerCase().includes(term))
      );
    });
  }, [recipes, searchTerm]);

  const renderBadges = (labels) => {
    const badgeColors = {
      Vegan: 'green',
      Vegetarian: 'green',
      'Gluten-Free': 'purple',
      'Dairy-Free': 'orange',
      Pescetarian: 'blue',
      Meat: 'red',
    };

    return labels
      .filter(label =>
        ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Pescetarian', 'Meat'].includes(label)
      )
      .map(label => (
        <Badge key={label} colorScheme={badgeColors[label]} borderRadius="md" px={2} py={1}>
          {label}
        </Badge>
      ));
  };

  const renderAllergyWarnings = (cautions) => {
    // If there are allergy warnings, only show the "Cautions" label and the allergies as badges
    if (!cautions || cautions.length === 0) return null;

    return (
      <Box mt={3}>
        <Text fontWeight="bold" color="red.600">Cautions:</Text>
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          {cautions.map(caution => (
            <Badge key={caution} colorScheme="red" borderRadius="md" px={2} py={1}>
              {caution}
            </Badge>
          ))}
        </Box>
      </Box>
    );
  };

  const renderDishType = (dishType) => {
    if (!dishType || dishType.length === 0) return null;
    return (
      <Box mt={3}>
        <Text fontWeight="bold" color="teal.600">Dish Type:</Text>
        <Text>{dishType.join(', ')}</Text>
      </Box>
    );
  };

  return (
    <Container maxW="7xl" py={10} bg="teal.50"> {/* Background color added */}
      <VStack spacing={6} align="start" w="100%">
        <Heading size="2xl" color="teal.700">Discover Recipes</Heading>

        <Input
          placeholder="Search by name or labels (e.g., vegan, vegetarian, gluten)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          size="lg"
          bg="white"
          maxW="500px"
        />

        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={6} w="100%">
          {filteredRecipes.map(({ recipe }) => (
            <Box
              key={recipe.label}
              p={4}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              onClick={() => onSelectRecipe(recipe)}
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.03)', cursor: 'pointer' }}
              borderWidth="1px" // Border added to make it stand out
              borderColor="gray.200"
            >
              {/* Ensuring images are of the same size and position */}
              <Image
                src={recipe.image}
                alt={recipe.label}
                borderRadius="md"
                objectFit="cover"
                height="200px" // Fixed height for all images
                width="100%" // Full width for images
                mb={3}
              />
              <Heading size="md" mb={2}>{recipe.label}</Heading>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {renderBadges(recipe.healthLabels)}
                {renderBadges(recipe.dietLabels)}
              </Box>
              {renderDishType(recipe.dishType)} {/* Display dish type */}
              {renderAllergyWarnings(recipe.cautions)} {/* Display allergy warnings */}
            </Box>
          ))}
        </Grid>

        {filteredRecipes.length === 0 && (
          <Text color="gray.500" fontSize="lg">No recipes found.</Text>
        )}
      </VStack>
    </Container>
  );
};