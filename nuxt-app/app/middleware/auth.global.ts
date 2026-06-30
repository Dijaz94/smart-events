export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  // Rutas que son públicas
  const rutasPublicas = ["/iniciarSesion", "/", "/registrarse", "/eventos"];

  if (!loggedIn.value && !rutasPublicas.includes(to.path)) {
    return navigateTo("/iniciarSesion");
  }
});