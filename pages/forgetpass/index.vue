<template>
  <div>
    <v-card>
      <v-card-title
        ><v-icon class="blue--text ml-2" @click="back"
          >mdi-keyboard-backspace</v-icon
        >
        <h5 class="mx-auto grey--text ml-17">Forget Password</h5></v-card-title
      >
      <v-card-text>
        <v-text-field
          v-model="email"
          class="mx-3"
          label="Enter your Email"
          prepend-icon="mdi-email-search cyan--text"
          :rules="emailRules"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn large class="success mx-auto font-weight-bold" @click="sendData"
          >Submit</v-btn
        >
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
  data() {
    return {
      sucssSendData: {
        snackbar: false,
        text: 'Check your inbox Email',
      },
      erorrData: {
        snackbar: false,
        text: 'Email not found ',
      },
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
    async sendData() {
      try {
        const data = await this.$axios.post(
          '/proUrl/reset/send',
          {
            email: this.email,
          },
          {
            validateStatus() {
              return true
            },
          }
        )
        console.log(data)

        if (data.data.success) {
          this.$router.push('./changePass')
          this.$storage.setUniversal('changeData', data.data)
        } else {
          this.erorrData.snackbar = true
        }
      } catch (e) {
        return console.error(e)
      }
    },
  },
}
</script>

<style></style>
