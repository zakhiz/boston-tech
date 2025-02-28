<script setup lang="ts">
import { notify } from '../config/toastify.notification';
import router from '../router/index.router';
import { logout } from '../services/auth.service';

    const handleLogout = async () => {
        
        try {
            await logout();
            router.push('/')
            notify({
                title: 'Cerraste sesión correctamente',
                icon: 'success',
                color: "#fff",
                position:'top'
            });
            
        } catch (error) {
            notify({
                title: 'Ocurrio un error al cerrar sesion',
                icon: 'warning',
                color: "#fff",
                position:'top'
            });
        }
    }
    const scrollToRecord = () => {
        
        const tablaHistorial = document.getElementById('record');

        if (tablaHistorial) {
            tablaHistorial.scrollIntoView({ behavior: 'smooth', block : 'center' });
        };

    };


    const scrollToRanking = () => {
        
        const tablaRanking = document.getElementById('ranking');

        if (tablaRanking) {
            tablaRanking.scrollIntoView({ behavior: 'smooth', block : 'center' });
        };

    };

</script>

<template>
    <div class="flex justify-between items-center bg-[#56ab91] w-full h-[65px] rounded-b-md">
            <ul class="flex gap-6 xl:mr-5 ml-5 text-white">
                <li>
                    <a @click="scrollToRecord" to="/" class="cursor-pointer font-semibold">Historial</a>
                </li>
                <li>
                    <a @click="scrollToRanking" class="cursor-pointer font-semibold">Top Usuarios </a>
                </li>
            </ul>
            <div>
                <button @click="handleLogout" class="bg-[#036666] xl:p-4 p-3 mr-5 rounded-b-lg cursor-pointer text-white">Cerrar Sesión</button>
            </div>
    </div>
</template>