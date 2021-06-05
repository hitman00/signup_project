<template>
  <div>
    <v-card>
      <v-card-title class="grey--text mb-3 d-flex justify-space-between"
        >My Profile
        <span class="font-weight-light poin" @click="logout"
          >Logout <v-icon class="mdi mdi-logout grey--text"></v-icon
        ></span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          append-icon="mdi-account"
          label="Name"
          class="mr-4"
          disabled
        >
        </v-text-field>
        <v-text-field
          v-model="email"
          append-icon="mdi-email"
          label="Email"
          class="mr-4"
          disabled
        >
        </v-text-field>
        <v-text-field
          v-model="mobile"
          append-icon="mdi-phone"
          label="Mobile "
          class="mr-4"
          disabled
        >
        </v-text-field>
        <div v-if="show">
          <v-text-field label="Enter Code" class="mr-4"> </v-text-field>
          <v-text-field
            v-model="password"
            append-icon="mdi-eye"
            class="mr-4"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            v-model="password_confirmation"
            append-icon="mdi-eye"
            label="Confirmation Password"
            class="mr-4"
            :type="showPasswordCon ? 'text' : 'password'"
            @click:append="showPasswordCon = !showPasswordCon"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn v-if="show" class="success" @click="editData">send</v-btn>
        <v-btn id="changeName" @click="showChangePassword"
          >Change Password</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'log',
  data() {
    return {
      email: '',
      name: '',
      mobile: '',
      password: '',
      password_confirmation: '',
      code: '',
      show: false,
      showPassword: false,
      showPasswordCon: false,
    }
  },
  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      const data = this.$storage.getUniversal('data')
      console.log(data)
      this.email = data.result.original.user.email
      this.name = data.result.original.user.name
      this.mobile = data.result.original.user.mobile
      this.code = data.result.original.user.id
    },
    async showChangePassword() {
      this.show = !this.show
      if (this.show) {
        document.getElementById('changeName').innerHTML = 'Cancel'
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
        console.log(data.data)
      } else {
        document.getElementById('changeName').innerHTML = 'change password'
      }

      // document.getElementById('myText').readOnly = false
      // document.getElementsByClassName('myText').readOnly = false
      // document.querySelectorAll('#myText').readOnly = false
      // document.querySelectorAll('.hii').readOnly = false
    },
    async editData() {
      const data = await this.$axios.post(
        '/proUrl/reset/change',
        {
          email: this.email,
          code: this.code,
          password: this.password,
          password_confirmation: this.password_confirmation,
        },
        {
          validateStatus() {
            return true
          },
        }
      )
      console.log(data.data)
    },
    logout() {
      this.$storage.removeUniversal('data')
      this.$router.push('./')
    },
  },
  // computed: {
  //   loaddata() {
  //     const getData = this.$storage.getUniversal('rr')
  //     console.log(getData)
  //     if (getData !== null) {
  //       console.log('trueee')
  //       return this.show
  //     } else {
  //       console.log('fals')
  //       return this.getBackLogin()
  //     }
  //     // if (getData.success) {
  //     //   console.log('ses')
  //     //   return this.getBackLogin
  //     // } else {
  //     //   return this.getBackLogin
  //     // }
  //   },
  // },
  // methods: {
  //   getBackLogin() {
  //     console.log('asd')
  //     this.$router.push('./')
  //   },
  // },
}
</script>

<style>
.v-btn {
  text-transform: capitalize;
}
.poin {
  cursor: pointer;
}
</style>
