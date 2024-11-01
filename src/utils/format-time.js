import { format, getTime, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; // Import the Vietnamese locale

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";
  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";
  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

// Format date in Vietnamese locale
export function fDateVN(date, newFormat) {
  const fm = newFormat || "dd MMMM yyyy"; // Default format for Vietnamese
  return date ? format(new Date(date), fm, { locale: vi }) : "";
}

// Format distance to now in Vietnamese locale
export function fToNowVN(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: vi, // Use Vietnamese locale
      })
    : "";
}
// tiền tệ và % //
export function formatCurrency(value, locale = "vi-VN", currency = "VND") {
  if (!value) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0, // No decimal points for VND
  }).format(value);
}

// Format percentage
export function formatPercentage(
  value,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2
) {
  if (value == null) return "";
  return `${value.toFixed(minimumFractionDigits)}%`;
}

export const formatDay = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
