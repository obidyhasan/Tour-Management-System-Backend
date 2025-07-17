export interface IDivision {
  name: string;
  slug: string;
  thumbnail?: string;
  description?: string;
}

/**
 * division name = Khulna Division
 *
 * slug = khulna-division
 *
 * /:id => /aaaaaaaaaaaaaaaa
 *
 * /:slug => /division/khulna-division
 */
