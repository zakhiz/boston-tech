import { gapi } from "gapi-script";

export const initGoogleAuth = () => {
  return new Promise((resolve) => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: import.meta.env.VITE_GCLOUD_SCOPES,
      }).then(() => {
        resolve(gapi.auth2.getAuthInstance());
      });
    });
  });
};

