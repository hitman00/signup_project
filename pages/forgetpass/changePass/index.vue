<template>
  <v-card>
    <v-card-title>Enter Code</v-card-title>
    <v-card-text>
      <v-text-field v-model="code" label="code" type="number"></v-text-field>
      <v-text-field
        v-model="password"
        append-icon="mdi-eye"
        label="New Password"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        append-icon="mdi-eye"
        label="Confirm Password"
        :type="showConfirmPassword ? 'text' : 'password'"
        @click:append="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>
      <v-card-actions>
        <v-btn class="blue" @click="sendData">send</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  }),
  methods: {
    async sendData() {
      const data = await this.$axios.post(
        '/proUrl/reset/change',
        {
          email: this.email,
          code: this.code,
          password: this.password,
          password_confirmation: this.confirmPassword,
        },
        {
          ValidityState() {
            return true
          },
        }
      )
      this.email = this.$storage.getUniversal('changeData')
      console.log(this.email)
      if (data.data.success) {
        console.log('pass')
      }
    },
  },
}
</script>

<style></style>
