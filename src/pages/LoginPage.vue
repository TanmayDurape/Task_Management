<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Image on the left -->
      <div class="col-md-6">
        <img src="../assets/image_1.jpg" alt="Login Image" class="img-fluid"/>
      </div>
      <!-- Login Form on the right -->
      <div class="col-md-6">
        <div>
          <div>
            <h3>Login {{ firstname }}</h3>
          </div>
          <div class="alert alert-danger" v-if="error">{{ error }}</div>
          <form @submit.prevent="onLogin()">
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" v-model.trim="email" />
              <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model.trim="password" />
              <div class="error" v-if="errors.password">{{ errors.password }}</div>
            </div>

            <div class="my-3">
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { LOGIN_ACTION } from '@/store/storeconstants';
// import {mapState} from 'vuex';
import {mapActions} from 'vuex';
import {mapMutations} from 'vuex';
import SignupValidations from '../services/SignupValidations';
import {LOADING_SPINNER_SHOW_MUTATION} from '../store/storeconstants';
    export default{
        data() {
            return {
                email: '',
                password: '',
                errors: [],
                error: '',
            };
        },
        methods:{
            ...mapActions('auth',{
              login: LOGIN_ACTION,
            }),
            ...mapMutations({
                showLoading: LOADING_SPINNER_SHOW_MUTATION
            }),
            async onLogin() {
                let validations = new SignupValidations(
                    this.email,
                    this.password,
                );

                this.errors = validations.checkValidations();
                if (this.errors.length) {
                    return false;
                }
                this.error = '';
                this.showLoading(true);
                try {
                    await this.login({
                      email: this.email,
                      password: this.password,
                    });
                } catch (e) {
                      this.error = e;
                      this.showLoading(false);
                }

                this.showLoading(false);
                this.$router.push('/posts');
            },
      },
};
</script>


<style>
/* .img-fluid{
  height: 20%;
  width: 50%;
} */
/* .btn-53,
.btn-53 *,
.btn-53 :after,
.btn-53 :before,
.btn-53:after,
.btn-53:before {
  border: 0 solid;
  box-sizing: border-box;
}

.btn-53 {
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  background-color: #000;
  background-image: none;
  color: #fff;
  cursor: pointer;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 100%;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
  padding: 0;
}

.btn-53:disabled {
  cursor: default;
}

.btn-53:-moz-focusring {
  outline: auto;
}

.btn-53 svg {
  display: block;
  vertical-align: middle;
}

.btn-53 [hidden] {
  display: none;
}

.btn-53 {
  border: 1px solid;
  border-radius: 999px;
  box-sizing: border-box;
  display: block;
  font-weight: 900;
  overflow: hidden;
  padding: 1.2rem 3rem;
  position: relative;
  text-transform: uppercase;
}

.btn-53 .original {
  background: #fff;
  color: #000;
  display: grid;
  inset: 0;
  place-content: center;
  position: absolute;
  transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1);
}

.btn-53:hover .original {
  transform: translateY(100%);
}

.btn-53 .letters {
  display: inline-flex;
}

.btn-53 span {
  opacity: 0;
  transform: translateY(-15px);
  transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1), opacity 0.2s;
}

.btn-53 span:nth-child(2n) {
  transform: translateY(15px);
}

.btn-53:hover span {
  opacity: 1;
  transform: translateY(0);
}

.btn-53:hover span:nth-child(2) {
  transition-delay: 0.1s;
}

.btn-53:hover span:nth-child(3) {
  transition-delay: 0.2s;
}

.btn-53:hover span:nth-child(4) {
  transition-delay: 0.3s;
}

.btn-53:hover span:nth-child(5) {
  transition-delay: 0.4s;
}

.btn-53:hover span:nth-child(6) {
  transition-delay: 0.5s;
} */

</style>