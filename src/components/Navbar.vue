<script setup lang="ts">
    const scrollToLogin = () => {
    
        const loginSection = document.getElementById('login');

        if (loginSection) {
            loginSection.scrollIntoView({ behavior: 'smooth' });
        };
    
    };

</script>
<template>
      <nav class="bg-[#56ab91] w-full h-[60px] flex justify-between items-center ">
            <div>
                <a class="text-white font-semibold ml-5 xl:text-3xl text-2xl">Vellum</a>
            </div>
            <ul class="flex gap-2 xl:mr-5 mr-2 text-white">
                <li>
                    <RouterLink to="/" class="cursor-pointer">Inicio </RouterLink>
                </li>
                
                <li>
                    <a @click="scrollToLogin" class="bg-[#036666] xl:p-4 p-3 rounded-b-lg cursor-pointer">Iniciar Sesión</a>
                </li>
            </ul>
       </nav>
</template>