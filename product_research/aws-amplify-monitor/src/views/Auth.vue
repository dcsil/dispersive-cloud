<template>
    <div class="page-auth">

      <div class="login"> 
        <amplify-authenticator></amplify-authenticator>
      </div>
  
    </div>

</template>


<script>

import { Auth, Storage, Logger } from 'aws-amplify'
import AmplifyStore from '../store/store';
export default {
  name: 'Auth',
  components:{

  },
  data:  () => {
    const that = this;
    return {
      profilePic: false,
      imagePath: `${AmplifyStore.state.user.username}/avatar`,
      photoPickerConfig: {
        header: 'Upload Profile Pic',
        accept: 'image/*',
        path: `${AmplifyStore.state.user.username}/`,
        defaultName: 'avatar'
      },
      mfa: false,
      fields: [
        { type: 'string', name: 'email', label: 'Email' },
        { type: 'string', name: 'phone_number', label: 'Phone Number' }
      ],
    };
  },
  mounted(){
      //console.log('sdf')
      // console.log(Auth._config)
      
  },
  methods: {
    toggleAccordion: function(el) {
      this[el] = !this[el]
    },
  },
  computed: {
    mfaConfig: function() {
      let that = this;
      return {
        mfaDescription: 'My app\'s mfa description!!',
        mfaTypes: ['TOTP', 'SMS', 'None'],
        cancelHandler: function() {
          that.toggleAccordion('mfa')
        },
      }
    },
    user: function() { 
      return AmplifyStore.state.user 
    },
    profilePicAccordion: function() {
      return {
        'is-closed': !this.profilePic,
        'is-primary': this.profilePic,
        'is-dark': !this.profilePic
      };
    },
    mfaAccordion: function() {
      return {
        'is-closed': !this.mfa,
        'is-primary': this.mfa,
        'is-dark': !this.mfa
      };
    }
  }
}

</script>

<style scoped>
.page-auth{
  width: 100vw;
  height: 100vh;
  background-image: url(~/images/background.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  font-family: "fairplex-wide";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position:relative;
}

/* Logo */
header{
  width: 100vw;
  padding: 30px 0 100px;
}
header img{
  margin: 0 auto;
  display: block;
}
.login{
  position:absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>