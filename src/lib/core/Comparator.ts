const stringify = (value: string | number | boolean = null) => {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
const isNull = (entry: any) => {
  if (entry === null || entry === undefined) return true;
};

export const check = {
  contains: (entry: any, value: string | number | boolean) => {
    return stringify(entry).indexOf(stringify(value)) > -1;
  },

  startsWith: (entry: any, value: string) => {
    return stringify(entry).startsWith(stringify(value));
  },

  endsWith: (entry: any, value: string) => {
    return stringify(entry).endsWith(stringify(value));
  },

  isEqualTo: (entry: any, value: string | number | boolean) => {
    return stringify(entry) === stringify(value);
  },

  isGreaterThan: (entry: number, value: number) => {
    if (isNull(entry)) return false;
    return entry > value;
  },

  isGreaterThanOrEqualTo: (entry: number, value: number) => {
    if (isNull(entry)) return false;
    return entry >= value;
  },

  isLessThan: (entry: number, value: number) => {
    if (isNull(entry)) return false;
    return entry < value;
  },

  isLessThanOrEqualTo: (entry: number, value: number) => {
    if (isNull(entry)) return false;
    return entry <= value;
  },

  isBetween: (entry: number, value: [min: number, max: number]) => {
    if (isNull(entry)) return false;
    const [min, max] = value;
    return entry >= min && entry <= max;
  },

  isStrictlyBetween: (entry: number, value: [min: number, max: number]) => {
    if (isNull(entry)) return false;
    const [min, max] = value;
    return entry > min && entry < max;
  },

  isTrue: (entry: any, value = 'boolean') => {
    return entry === true;
  },

  isFalse: (entry: any, value = 'boolean') => {
    return entry === false;
  },

  isNull: (entry: any, value = 'null') => {
    return entry === null || entry === undefined;
  },

  isNotNull: (entry: any, value = 'null') => {
    return entry === null || entry === undefined ? false : true;
  }
};
