<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                 <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignin">
                                <v-layout row>
                                    <v-flex>
                                        <v-text-field
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required
                                        >

                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <v-text-field
                                        name="password"
                                        label="PasswordMail"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required
                                        >
                                            
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <v-btn type="submit" :loading="loading" :disabled="loading">
                                            Sign in
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data(){
      return{
          email: '',
          password: ''
      }
  },
  computed:{
      user(){
          return this.$store.getters.user;
      },
      error(){
          return this.$store.getters.error;
      },
      loading(){
          return this.$store.getters.loading;
      }
  },
  watch:{
      user(value){
          if(value !== null && value !== undefined){
              this.$router.push("/");
          }
      }
  },
  methods: {
      onSignin(){
          
          let payload = {
            email: this.email, 
            password: this.password
          }

          this.$store.dispatch('signUserIn', payload);
      },
      onDismissed(){
          this.$store.dispatch('clearError');
      }
  }
}
</script>
