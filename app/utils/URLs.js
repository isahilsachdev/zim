export const getGoogleLoginUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  let redirectUri = process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_REDIRECT;
  redirectUri = encodeURIComponent(redirectUri);
  return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile%20email&prompt=select_account`;
};
