import dayjs from "dayjs";

const calculateCountdown = (expiryTime: string) => {
  const now = dayjs(); // Waktu saat ini
  const expiry = dayjs(expiryTime); // Waktu kadaluwarsa

  const diffInSeconds = expiry.diff(now, "second");

  if (diffInSeconds <= 0) {
    return "Waktu habis";
  }

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export default calculateCountdown;
