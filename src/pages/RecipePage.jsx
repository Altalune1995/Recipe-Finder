import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Text,
  VStack,
  Badge,
  Grid,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';

const RecipePage = ({ recipe, onGoBack }) => {
  if (!recipe) return <Text>No recipe loaded.</Text>;

  const labelColors = {
    Vegan: 'green',
    Vegetarian: 'green',
    'Gluten-Free': 'purple',
    'Dairy-Free': 'orange',
    Pescetarian: 'blue',
    Meat: 'red',
    Fish: 'blue',
    Shellfish: 'pink',
    Eggs: 'yellow',
    Nuts: 'yellow',
    Soy: 'orange',
    Wheat: 'purple',
    Sulfites: 'red',
    Sesame: 'yellow',
    Peanuts: 'red',
    Alcohol: 'gray',
    Sugar: 'pink',
  };

  const renderBadges = (labels = []) =>
    labels.map((label) => {
      const color = labelColors[label] || 'gray';
      return (
        <Badge
          key={label}
          colorScheme={color}
          variant="solid"
          px={3}
          py={1}
          borderRadius="md"
          fontWeight="bold"
          fontSize="sm"
        >
          {label}
        </Badge>
      );
    });

  const nutrients = recipe.totalNutrients;

  return (
    <Container maxW="7xl" py={10}>
      <VStack spacing={6} align="start">
        <Button onClick={onGoBack} colorScheme="teal">← Back</Button>

        <Heading size="2xl" color="teal.700">{recipe.label}</Heading>

        <Image
          src={recipe.image}
          alt={recipe.label}
          borderRadius="xl"
          objectFit="cover"
          maxH="400px"
          w="100%"
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="100%">
          {/* Left column: Labels and Time */}
          <Box>
            <VStack align="start" spacing={4}>
              <Box>
                <Text fontWeight="bold" color="teal.600">Cooking Time:</Text>
                <Text>{recipe.totalTime || 'Not specified'} minutes</Text>
              </Box>

              <Divider borderColor="gray.300" />

              {recipe.healthLabels?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" color="teal.600">Health Labels:</Text>
                  <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                    {renderBadges(recipe.healthLabels)}
                  </Box>
                </Box>
              )}

              <Divider borderColor="gray.300" />

              {recipe.dietLabels?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" color="teal.600">Diet Labels:</Text>
                  <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                    {renderBadges(recipe.dietLabels)}
                  </Box>
                </Box>
              )}

              <Divider borderColor="gray.300" />

              {recipe.cautions?.length > 0 && (
                <Box>
                  <Text fontWeight="bold" color="red.600">Cautions:</Text>
                  <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                    {renderBadges(recipe.cautions)}
                  </Box>
                </Box>
              )}

              <Divider borderColor="gray.300" />

              {recipe.yield && (
                <Box>
                  <Text fontWeight="bold" color="teal.600">Servings:</Text>
                  <Text>{recipe.yield}</Text>
                </Box>
              )}
            </VStack>
          </Box>

          {/* Right column: Ingredients and Nutrients */}
          <Box>
            <VStack align="start" spacing={6}>
              <Box>
                <Text fontWeight="bold" color="teal.600">Ingredients:</Text>
                <VStack align="start" spacing={1} mt={2}>
                  {recipe.ingredientLines.map((line, index) => (
                    <Text key={index}>• {line}</Text>
                  ))}
                </VStack>
              </Box>

              <Divider borderColor="gray.300" />

              <Box>
                <Text fontWeight="bold" fontSize="lg" color="teal.600">Total Nutrients:</Text>
                <Grid templateColumns="1fr 1fr" gap={4} mt={4}>
                  <Text>Energy: {Math.round(nutrients.ENERC_KCAL?.quantity)} kcal</Text>
                  <Text>Protein: {Math.round(nutrients.PROCNT?.quantity)} g</Text>
                  <Text>Fat: {Math.round(nutrients.FAT?.quantity)} g</Text>
                  <Text>Carbs: {Math.round(nutrients.CHOCDF?.quantity)} g</Text>
                  <Text>Cholesterol: {Math.round(nutrients.CHOLE?.quantity)} mg</Text>
                  <Text>Sodium: {Math.round(nutrients.NA?.quantity)} mg</Text>
                </Grid>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default RecipePage;