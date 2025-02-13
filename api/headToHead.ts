import axios from "axios";

export const getHeadToHead = async (idHome?: string, idAway?: string) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${idHome}-${idAway}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );
    return response.data.response;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
