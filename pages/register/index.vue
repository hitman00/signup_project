<template>
  <div>
    <v-card>
      <v-card-title
        ><v-icon class="blue--text" @click="back"
          >mdi-keyboard-backspace</v-icon
        >
        <h4 class="grey--text mx-auto">Sign up</h4></v-card-title
      >
      <v-card-text>
        <v-form ref="forms">
          <v-text-field v-model="name" label="name"></v-text-field>
          <v-text-field
            v-model="email"
            label="email"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            append-icon="mdi-eye"
            label="password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            v-model="passwordConfirmation"
            label="confirm password"
            :type="showConfirmPassword ? 'text' : 'password'"
            append-icon="mdi-eye"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field
        ></v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-2" @click="sendData">submit</v-btn>
        <v-btn @click="reset">clear</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="sucssSendData.snackbar"
      :timeout="3000"
      top
      color="success"
      content-class="text-center"
      rounded="pill"
      centered
    >
      {{ sucssSendData.text }}
    </v-snackbar>
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
  data() {
    return {
      sucssSendData: {
        snackbar: false,
        text: 'Sign up success',
      },
      erorrData: {
        snackbar: false,
        text: '',
      },
      name: '',
      password: '',
      passwordConfirmation: '',
      errorMassage: '',
      showPassword: false,
      showConfirmPassword: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    back() {
      this.$router.push('./')
    },
    reset() {
      this.$refs.forms.reset()
    },
    async sendData() {
      const data = await this.$axios.post(
        '/proUrl/register',
        {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        },
        {
          validateStatus() {
            return true
          },
        }
      )
      console.log(data)
      if (data.data.success) {
        this.sucssSendData.snackbar = true
      } else {
        this.erorrData.snackbar = true
        this.erorrData.text = data.data.message
      }
    },
  },
}
</script>

<style></style>
