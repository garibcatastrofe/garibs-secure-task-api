export const IS_ADMIN = ['SI', 'NO'] as const;

export type IsAdminType = (typeof IS_ADMIN)[number];
