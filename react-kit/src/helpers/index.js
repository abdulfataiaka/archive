// This file is expected to contain helpers generic
// to the application parts

/* eslint-disable import/prefer-default-export */

/**
 *
 *
 * @description generate random number
 *
 * @param { Integer } maximum
 *
 * @returns { Integer }
 */
export const random = maximum => (
  maximum <= 0 ? 0 : 1 + Math.floor(Math.random() * maximum)
);
