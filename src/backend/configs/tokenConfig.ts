export const tokenConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_TOKEN,
    options: {
      expiresIn: "1h",
    },
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_TOKEN,
    options: {
      expiresIn: "30d",
    },
  },
};

export const resetPasswordTokenDuration = 1000 * 60 * 60 // 1 hour;
