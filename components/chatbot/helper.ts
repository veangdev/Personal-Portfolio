/** Collision-resistant micro-ID */
export const uid = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const fmtTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
