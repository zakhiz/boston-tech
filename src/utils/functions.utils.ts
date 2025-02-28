import dayjs from "dayjs";
import { dateFormat } from "./constants.util";

export const dateFilter = (timestamp: string | number | { _seconds: number, _nanoseconds?: number }) => {
  let numericTimestamp: number;

  try {
    if (typeof timestamp === 'string' && timestamp.includes('_seconds')) {
      timestamp = JSON.parse(timestamp);
    }

    if (typeof timestamp === 'object' && '_seconds' in timestamp) {
      numericTimestamp = timestamp._seconds * 1000 + Math.floor((timestamp._nanoseconds || 0) / 1e6);
    } else {
      const parsedTimestamp = Number(timestamp);
      numericTimestamp = parsedTimestamp > 1e12 ? parsedTimestamp : parsedTimestamp * 1000;
    }

    if (!isNaN(numericTimestamp)) {
      return dayjs(numericTimestamp).format(dateFormat);
    } else {
      return "Fecha Inválida";
    }
  } catch (error) {
    return "Fecha Inválida";
  }
};