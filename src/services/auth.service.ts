import { initGoogleAuth } from "./googleAuthcloud.service";
import router from "../router/index.router";

 export const signInWithGoogle = async () => {

    const auth : any = await initGoogleAuth();  

    return await auth.signIn();
    
  };
  
  export const logout = async () => {
    const auth : any= await initGoogleAuth();  

    await auth.signOut();

    router.push('/');
    
    return 
  };
  
  export const getCurrentUserToken = async () => {
    const auth : any= await initGoogleAuth();  

    const user = auth.currentUser.get();

    const token = user.getAuthResponse().access_token;
  
    return token;
  };