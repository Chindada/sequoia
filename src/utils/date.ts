export const MinuteToString = (minute: number) => {
  return minute < 60
    ? minute.toString().concat(" Min")
    : minute < 1440
      ? Math.floor(minute / 60)
          .toString()
          .concat(" Hr ")
          .concat((minute % 60).toString().concat(" Min"))
      : Math.floor(minute / 1440)
          .toString()
          .concat(" Day ")
          .concat(
            Math.floor((minute % 1440) / 60)
              .toString()
              .concat(" Hr ")
              .concat((minute % 60).toString().concat(" Min"))
          );
};

export const DaysInMonth = (month: number, year: number) => {
  switch (month) {
    case 1: // January
    case 3: // March
    case 5: // May
    case 7: // July
    case 8: // August
    case 10: // October
    case 12: // December
      return 31;
    case 4: // April
    case 6: // June
    case 9: // September
    case 11: // November
      return 30;
    case 2: // February
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    default:
      return -1; // Invalid month
  }
};

export const SecondsToAbbrTime = (seconds: number) => {
  let timeGapString: string;
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    timeGapString = `${minutes} min`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    timeGapString = `${hours} h ${remainingMinutes} m`;
  } else if (seconds < 86400 * 30) {
    const days = Math.floor(seconds / 86400);
    const remainingHours = Math.floor((seconds % 86400) / 3600);
    timeGapString = `${days} d ${remainingHours} h`;
  } else if (seconds < 86400 * 365) {
    const months = Math.floor(seconds / (86400 * 30));
    const remainingDays = Math.floor((seconds % (86400 * 30)) / 86400);
    timeGapString = `${months} m ${remainingDays} d`;
  } else {
    const years = Math.floor(seconds / (86400 * 365));
    const remainingMonths = Math.floor((seconds % (86400 * 365)) / (86400 * 30));
    timeGapString = `${years} y ${remainingMonths} m`;
  }
  return timeGapString;
};
