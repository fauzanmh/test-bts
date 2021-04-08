<template>
  <v-app style="background-color: white !important">
    <v-card flat style="background-color: white !important">
      <div style="background-color: white !important">
        <v-toolbar color="primary">
          <v-toolbar-title>
            <img class="mt-2" src="images/logosolidbodas-04.png" width="100" />
          </v-toolbar-title>
        </v-toolbar>
      </div>

      <v-main style="background-color: white !important">
        <nuxt />
      </v-main>
    </v-card>
    <alert-snackbar></alert-snackbar>
  </v-app>
</template>
<script>
import AlertSnackbar from "~/components/alert-snackbar.vue";
export default {
  components: {
    AlertSnackbar,
  },
};
</script>
