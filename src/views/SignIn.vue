<template lang="pug">
.signin-page
  .title SignIn
  form.signin-form(@submit.prevent="signIn")
    el-row.user-info.input-area
      el-col(:span="6")
        .text ID
      el-col(:span="12")
        el-input(v-model="userID")
    el-row.password-info.input-area
      el-col(:span="6")
        .text Password
      el-col(:span="12")
        el-input(type="password" v-model="password")
    el-button.auth-button(type="primary" native-type="submit") サインイン
    el-button.auth-button(type="info" @click="linkSignUp") サインアップする
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Auth } from "aws-amplify";
import router from "@/router";

@Component({})
export default class SignIn extends Vue {
  password: string = "";
  userID: string = "";

  public signIn() {
    const self = this;
    Auth.signIn(self.userID, self.password)
      .then(user => {
        return router.push("/");
      }).catch(err => {
        console.error(err);
      });
  }

  public linkSignUp() {
    return router.push("/signUp");
  }
}
</script>

<style scoped lang="scss">
.signin-form {
  margin: 40px auto 0;
  width: 40vw;

  .input-area {
    line-height: 60px;
    margin: 10px 0;
  }

  .auth-button {
    font-weight: bold;
    margin-top: 20px;
    width: 40%;
  }
}
</style>