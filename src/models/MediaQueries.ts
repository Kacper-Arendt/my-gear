const size = {
  mobileS: "320px",
  mobileM: "620px",
  tablet: "720px",
  laptop: "1020px",
  laptopL: "1440px",
  desktop: "1920px",
};

export const device: typeof size = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};
