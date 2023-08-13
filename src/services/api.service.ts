const base_url: string = process.env.NEXT_PUBLIC_API_DOMAIN as string
const api_key: string = process.env.NEXT_PUBLIC_API_KEY as string

export const API_REQUEST = {
  trending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-US`,
  top_rated: `${base_url}/movie/top_rated?api_key=${api_key}&language=en-US`,
};
