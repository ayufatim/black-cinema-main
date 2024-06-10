import { z } from "zod";

export const moviesSchema = z.object({
    id: z.string(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string(),
    backdrop_path: z.string(),
    genres: z.array(z.string()),
    category: z.array(z.string()),
    release_date: z.string(),
    trailer: z.string(),
    movieDuration: z.string(),
});

export type CreateMoviesSchemaType = z.infer<typeof moviesSchema>;