export const TODAY = "/today";
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const PROFILE = "/p/:username";
export const COMPLETED = "/completed";
export const ARCHIVED = "/archived";
export const NOT_FOUND = "/404";
export const API_V1 =
  `${
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  }` + "/api/v1/";
export const NO_HEADER = ["/", "/sign-up", "/sign-in"];
