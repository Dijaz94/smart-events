<script lang="ts"></script>


<template>
    <!-- body -->
    <div class="min-h-screen bg-linear-to-br from-color-start-transition-bg to-color-end-transition-bg">
        <!-- header -->
        <header class="border-b backdrop-blur">
            <div class="p-4 justify-around">
                <a href="localhost:3000">
                    <!-- Titulo -->
                <div>
                    <p class="text-xl font-semibold ">
                        <span class=" text-navbar-accent">S</span class="text-p-title">mart <span class="text-navbar-accent">E</span>vent</p>
                </div>
                
                </a>
                <!-- Páginas -->
                 <div>

                 </div>
                
            </div>


        </header>


        <slot/>
        <!-- footer -->
        <footer>

        </footer>
    </div>

</template>