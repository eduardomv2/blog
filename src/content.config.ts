import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";
import { CATEGORY_KEYS } from "@/constants";

export const BLOG_PATH = "src/data/blog";
export const PROJECTS_PATH = "src/data/proyectos";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${PROJECTS_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Número de catálogo del disco, ej. "ST-03"
      catalogo: z.string(),
      categoria: z.enum(CATEGORY_KEYS),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      // Portada del vinilo; si se omite se usa el degradado de la categoría
      cover: image().optional(),
      stack: z.array(z.string()).default([]),
      // Lado B del disco: resultados
      metricas: z
        .array(z.object({ nombre: z.string(), valor: z.string() }))
        .default([]),
      ficha: z
        .object({
          duracion: z.string().optional(),
          datos: z.string().optional(),
          rol: z.string().optional(),
        })
        .default({}),
      repo: z.string().optional(),
      demo: z.string().optional(),
      destacado: z.boolean().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { blog, proyectos };
