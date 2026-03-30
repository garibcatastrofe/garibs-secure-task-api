export const STATE = ['COMPLETADA', 'NO COMPLETADA', 'EN PROCESO', 'CANCELADA'] as const;

export type StatusType = (typeof STATE)[number];
