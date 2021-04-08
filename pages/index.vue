<template>
  <v-layout column>
    <v-row style="margin-top: -60px; z-index: 10">
      <v-col cols="12" class="pl-10 pr-10">
        <v-card>
          <v-card-text>
            <v-btn @click="dialog = true">Tambah Data</v-btn>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Actios</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{ item.name }}</td>
                    <td>
                      <v-btn class="error" @click="destroy(item.id)"
                        >Delete</v-btn
                      >
                      <v-btn class="warning">Detail</v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              dialog = false;
              save();
            "
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  head() {
    return {
      title: "Checklist Controller",
    };
  },

  data() {
    return {
      items: [],
      dialog: false,
      name: "",
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    ...mapMutations(["setSnackbar", "setText"]),

    fetch() {
      this.$axios
        .get(process.env.API_URL + "checklist")
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          this.setText(error.response.data.errorMessage);
          this.setSnackbar(true);
        });
    },

    destroy(id) {
      this.$axios
        .delete(process.env.API_URL + "checklist/" + id)
        .then((response) => {
          this.setText(response.data.message);
          this.fetch();
        })
        .catch((error) => {
          this.setText(error.response.data.message);
        })
        .finally(() => {
          this.setSnackbar(true);
        });
    },

    save() {
      this.$axios
        .post(process.env.API_URL + "checklist", {
          name: this.name,
        })
        .then((response) => {
          this.setText(response.data.message);
          this.fetch();
        })
        .catch((error) => {
          this.setText(error.response.data.message);
        })
        .finally(() => {
          this.setSnackbar(true);
        });
    },
  },
};
</script>
<style>
.no-p {
  padding: 2px !important;
}
.v-data-footer .v-btn {
  color: #1976d2 !important;
}
.v-data-table .v-data-table-header th {
  height: 50px !important;
  background-color: #1976d2 !important;
  color: #ffffff !important;
  border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}
.v-data-table td {
  height: 45px !important;
  font-size: 11px !important;
}
</style>
