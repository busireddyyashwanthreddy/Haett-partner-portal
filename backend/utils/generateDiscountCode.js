const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generateDiscountCode = () => {
  let suffix = "";

  for (let i = 0; i < 6; i += 1) {
    suffix += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
  }

  return `HAETT-${suffix}`;
};

export default generateDiscountCode;
