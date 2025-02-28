<script setup lang="ts">
    import { notify } from '../config/toastify.notification';
import router from '../router/index.router';
import { signInWithGoogle } from '../services/auth.service';

    const handleGoogleLogin = async () => {
        
        try {
            const googleUser = await signInWithGoogle();
            
            if (!googleUser) {
                throw new Error('No se pudo obtener informacion del usuario')
            }
            notify({
                title: 'Iniciaste sesion correctamente',
                icon: 'success',
                color: "#fff",
                position:'top'
            });
            router.push('/dashboard')
        } catch (error) {
            notify({
                title: 'Ocurrio un error al iniciar sesion, intentelo nuevamente.',
                icon: 'error',
                color: "#fff",
                position:'top'
            });
        }
    }

</script>
<template>
    <div class=" pt-25 pb-15 flex justify-center w-full gap-32 items-center" id="login">
        <div class="lg:w-[500px] md:w-[400px] w-[300px] h-full bg-[#036666] p-5 rounded-md">
            <h2 class="text-white font-semibold text-2xl">Ingresa para empezar a utilizarla</h2>
         
            <button @click="handleGoogleLogin" type="button" class="bg-[#56ab91] w-full p-2 mt-4 rounded-md cursor-pointer flex justify-center items-center gap-2"><img src="../assets/images/gIcon.png" alt="">GOOGLE</button>
        </div>
        <div class="xl:block hidden ">
            <img src="../assets/images/formLogin.svg" class="w-[600px] h-[450px]" alt="" srcset="">
        </div>
    </div>
</template>