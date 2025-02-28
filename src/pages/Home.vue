<script setup lang="ts">
    import AboutComponent from '../components/About.component.vue';
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';
    import LoginForm from '../components/LoginForm.vue';
</script>
<template>
    <div class="bg-[#272a2c] w-full min-h-screen">
        <Navbar/>
        <AboutComponent/>
        <LoginForm />
        <Footer/>  
    </div>

</template>