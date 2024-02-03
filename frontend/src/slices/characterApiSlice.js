import { apiSlice } from "./apiSlice";

const CHARACTERS_URL = "/api/characters";

export const characterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCharacter: builder.mutation({
      query: (data) => ({
        url: CHARACTERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getCharacters: builder.query({
      query: () => CHARACTERS_URL,
    }),
    getCharacterById: builder.query({
      query: (id) => `${CHARACTERS_URL}/${id}`,
    }),
    getCharacterByName: builder.query({
      query: (name) => `${CHARACTERS_URL}/name/${name}`,
    }),
    updateCharacterById: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CHARACTERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCharacterById: builder.mutation({
      query: (id) => ({
        url: `${CHARACTERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCharacterMutation,
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetCharacterByNameQuery,
  useUpdateCharacterByIdMutation,
  useDeleteCharacterByIdMutation,
} = characterApiSlice;
