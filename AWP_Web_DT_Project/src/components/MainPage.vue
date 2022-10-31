<template>
  <h1>Manage your Emails, Manage your time, Manage your future</h1>
  <a v-if="!user" style="margin: 5px;">Log-in first so that you can view and manage your e-mails !</a>
  <a v-else style="margin: 5px;">You can now view and manage your e-mails ! </a>
  <BaseButton :disabled="!user" :onclick="handleClickViewEmails">View emails</BaseButton>
  <br> <br> <br>
  <img class="displayed" src="./img/red-messagerie.png" alt=""> <br> <br>
</template>

<script>
import BaseButton from "@/components/utils/BaseButton";

export default {
  name: 'MainPage',
	components: {BaseButton},
  computed: {
    user() {
      return this.$store.state.msalInstance.getActiveAccount();
    }
  },
  methods: {
    handleClickGoBack() {
      this.$router.push("/about");
    },
    handleClickViewEmails() {
      this.$router.push("/emails");
    }
  }
}
</script>

<style>
img.displayed {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
</style>
