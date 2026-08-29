/**
 * Limits shared by the chat widget and its API route. They live here so the
 * client can't stop truncating at a different point than the server enforces.
 */

/** Per-message character cap. The route truncates; the input stops typing. */
export const MAX_INPUT_CHARS = 1500;

/** Conversation turns sent as context. */
export const MAX_TURNS = 8;
