export const formatDate = (
  dateString: string | null | undefined | Date
): string => {
  if (
    !dateString ||
    (typeof dateString === "string" && dateString.trim() === "")
  ) {
    return "-";
  }

  let date: Date;

  if (dateString instanceof Date) {
    date = dateString;
  } else {
    const dateWithZ = dateString.endsWith("Z") ? dateString : dateString + "Z";
    date = new Date(dateWithZ);
  }

  if (isNaN(date.getTime())) {
    return typeof dateString === "string" ? dateString : "-";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
