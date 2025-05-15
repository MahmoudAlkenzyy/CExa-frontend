function generateUniqueId() {
  const timestamp = Date.now(); // milliseconds since Jan 1, 1970
  const random = Math.floor(Math.random() * 1e6); // random 6-digit number
  return `id-${timestamp}-${random}`;
}
export const RandomId =generateUniqueId()