export const NaturalSort = (a: string, b: string): number => {
  const regex = /(\d+)|(\D+)/g;
  const aParts = a.match(regex) || [];
  const bParts = b.match(regex) || [];
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i];
    const bPart = bParts[i];
    if (aPart === undefined && bPart !== undefined) {
      return -1;
    }
    if (aPart !== undefined && bPart === undefined) {
      return 1;
    }
    if (aPart === bPart) {
      continue;
    }
    const aNum = parseInt(aPart, 10);
    const bNum = parseInt(bPart, 10);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    } else {
      return aPart.localeCompare(bPart);
    }
  }
  return 0;
};
