const getPaymentImage = (tipePembayaran: string) => {
  const images: { [key: string]: string } = {
    bri: "/assets/logo/bri.webp",
    bni: "/assets/logo/bni.png",
    mandiri: "/assets/logo/mandiri.svg",
    bca: "/assets/logo/bca.png",
    ovo: "/assets/logo/ovo.webp",
    gopay: "/assets/logo/gopay.webp",
    cimb: "/assets/logo/cimb.svg",
  };
  return images[tipePembayaran.toLowerCase()] || "/assets/logo/default.webp";
};

export default getPaymentImage;
