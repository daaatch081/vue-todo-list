<template lang="pug">
.signup-page
  .title SignUp
  form.signup-form(@submit.prevent="signUp" v-show="signupForm")
    el-row.email-info.input-area
      el-col(:span="6")
        .text EmailAddress
      el-col(:span="12")
        el-input(v-model="email")
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
    el-button.auth-button(type="primary" native-type="submit") サインアップ
  form.signup-form(@submit.prevent="userVerify" v-show="!signupForm")
    el-row.email-info.input-area
      el-col(:span="6")
        .text VerifyCode
      el-col(:span="12")
        el-input(v-model="verifyCode")
    el-button.auth-button(type="primary" native-type="submit") ユーザーの有効化
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Auth } from "aws-amplify";
import router from "@/router";

@Component({})
export default class SignUp extends Vue {
  email: string = "";
  password: string = "";
  signupForm: boolean = true;
  userID: string = "";
  verifyCode: string = "";

  public signUp() {
    const self = this;
    Auth.signUp(self.userID, self.password, self.email)
      .then(user => {
        self.signupForm = false;
      }).catch(err => {
        console.error(err);
      });
  }

  public userVerify() {
    console.log("verify!");
    const self = this;
    Auth.confirmSignUp(self.userID, self.verifyCode)
      .then(data => {
        alert("登録完了しました");
        return router.push("/signIn");
      }).catch(err => {
        console.error(err);
      });
  }
}
</script>

<style scoped lang="scss">
.signup-form {
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
