export const formatDate = (isodate: string): string => {
  const date = new Date(isodate);

  // Daftar nama bulan dalam bahasa Indonesia
  const monthNames: string[] = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const formattedDate: string = `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;

  return formattedDate;
};

export const formatDates = (isodate: string): string => {
  const date = new Date(isodate);

  // Daftar nama bulan dalam bahasa Indonesia
  const monthNames: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const formattedDates: string = `${date.getDate()}-${
    monthNames[date.getMonth()]
  }-${date.getFullYear()}`;

  return formattedDates;
};
