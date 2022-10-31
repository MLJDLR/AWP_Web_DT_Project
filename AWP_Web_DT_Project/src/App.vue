<template>
  <HeaderPage />
  <router-view></router-view>
  <FooterPage />
</template>

<script>
import HeaderPage from "@/components/HeaderPage";
import FooterPage from "@/components/FooterPage";

export default {
  name: 'App',
  components: {FooterPage, HeaderPage},
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
	* {
		font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	}
</style>
