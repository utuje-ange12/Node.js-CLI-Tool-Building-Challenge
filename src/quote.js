// Get a random motivational quote
export async function getMotivationalQuote() {
  try {
    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch a motivational quote.");
    }

    const data = await response.json();

    return {
      quote: data.quote,
      author: data.author,
    };
  } catch (error) {
    console.error("Could not get a motivational quote:", error.message);
    return null;
  }
}