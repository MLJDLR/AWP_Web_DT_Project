<template>
    <a class="nav">
      <h1 class="maj">{{ title }}</h1>
    </a>
    <a class="nav">
      <div v-if="user">
        You are logged in<!--as {{user.name}} (normally works and we get the name but not always, that's a mystery) -->
        <AsyncButton color="#e62143" style="margin-left: 10px" :onClick="handleClickLogout">Log out</AsyncButton>
      </div>
      <div v-else>
        You are not logged in.
        <AsyncButton style="margin-left: 20px" :onClick="handleClickLoginMicrosoft">Login with Microsoft</AsyncButton>
        <AsyncButton style="margin-left: 5px" :onClick="handleClickLoginGoogle">Login with Google</AsyncButton>
      </div>
    </a>
  <div class="nav">
    <h4 class="maj" v-for="link in links" :key="link.alias">
      <router-link class="maj" :to="link.url">{{link.title }}</router-link>
    </h4>
  </div>
</template>

<script>
import { app, links } from "@/_config";
import AsyncButton from "@/components/utils/AsyncButton";

export default {
  name : 'HeaderPage',
  data() {
    return {
      title: app.title,
      links: links,
    };
  },
  components: {AsyncButton},
  computed: {
    user() {
      return this.$store.state.msalInstance.getActiveAccount();
    }
  },
  methods: {
    handleClickLoginMicrosoft() {
      return this.$store.dispatch("loginMicrosoft")
    },
    handleClickLoginGoogle() {
      return this.$store.dispatch("loginGoogle")
    },
    handleClickLogout() {
      return this.$store.dispatch("logout")
    }
  }
}
</script>

<style>
.nav{
  background-color: #462a32;
  color: #c76565;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.maj{
  color: #c76565;
}

.nav h4:hover{
  background : #ececec;
  color: #c76565;

}
</style>