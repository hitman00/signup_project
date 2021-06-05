<template>
  <div>
    <v-card>
      <v-card-title><h3 class="mx-auto grey--text">Login</h3></v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            prepend-icon="mdi-account"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye"
            label="Password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <div>
          <v-btn large class="success ml-3" @click="sendLogin">Login</v-btn>

          <v-btn
            large
            color="rgb(40 162 94) "
            class="white--text mx-3"
            @click="singUp"
            >sign up</v-btn
          >
        </div>
        <v-btn plain depressed @click="forget">forget password</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="erorrData.snackbar"
      :timeout="3000"
      top
      color="red"
      content-class="text-center"
      rounded="pill"
      centered
    >
      {{ erorrData.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  middleware: 'login',
  data: () => ({
    erorrData: {
      snackbar: false,
      text: 'User not found',
    },
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    showPassword: false,
    password: '',
    items: [],
  }),

  methods: {
    async sendLogin() {
      try {
        const data = await this.$axios.post(
          '/proUrl/login',
          {
            email: this.email,
            password: this.password,
          },
          {
            validateStatus() {
              return true
            },
          }
        )
        if (data.data.success === true) {
          this.$storage.setUniversal('data', data.data)
          this.$router.push('./bank')
        } else {
          this.erorrData.snackbar = true
        }
      } catch (e) {
        console.log(e)
      }
    },
    forget() {
      this.$router.push('./forgetpass')
    },
    singUp() {
      this.$router.push('./register')
    },
  },
}
</script>

<style lang="scss">
.v-btn {
  text-transform: capitalize;
}
</style>
