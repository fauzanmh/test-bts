<template>
  <v-container
    class="ma-12 pa-5"
    fluid
    fill-height
    style="background-color: white !important"
  >
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card class="custom-login-form" elevation="2" :disabled="isLoading">
          <v-progress-linear
            :active="isLoading"
            :indeterminate="isLoading"
            absolute
            top
            color="primary"
          ></v-progress-linear>
          <v-container class="pa-10">
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="12">
                <v-alert
                  dark
                  class="title"
                  style="
                    background-color: #1976d2 !important;
                    border-color: #1976d2 !important;
                  "
                >
                  <v-icon class="mr-2">mdi-comment-account</v-icon>
                  <span class="title white--text">Register</span>
                </v-alert>
                <br />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  :disabled="isLoading"
                  label="Email"
                  dense
                  v-model="form.email"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  :disabled="isLoading"
                  label="Password"
                  dense
                  v-model="form.password"
                  :type="show.password ? 'text' : 'password'"
                  :append-icon="show.password ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="show.password = !show.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  :disabled="isLoading"
                  label="Username"
                  dense
                  v-model="form.username"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-5">
                <v-btn
                  class="success"
                  @click="register()"
                  :disabled="
                    isLoading ||
                    form.username == '' ||
                    form.password == '' ||
                    form.email == ''
                  "
                  block
                  >Register</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  head() {
    return {
      title: "Register",
    };
  },
  auth: false,
  layout: "blank",
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
      },
      show: {
        password: false,
      },
      isLoading: false,
    };
  },

  methods: {
    ...mapMutations(["setSnackbar", "setText"]),

    register() {
      this.isLoading = true;
      let message = "";

      this.$axios
        .post("/register", this.form)
        .then((response) => {
          message = response.data.message;

          this.$router.push("/login");
        })
        .catch((error) => {
          message = error.response.data.errorMessage;
        })
        .finally(() => {
          this.setText(message);
          this.setSnackbar(true);
        });
    },
  },
};
</script>
<style>
.v-content__wrap {
  background-color: white !important ;
}
</style>
