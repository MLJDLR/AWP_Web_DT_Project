<template>
	<br />
	<BaseButton color="#c76565" :onclick="handleClickGoBack">Back to e-mails</BaseButton>
  <h1>E-mail detail</h1>

  <div v-if="isLoading">
    <i>Loading...</i>
  </div>
  <div v-else>

		<div style="border: 1px solid grey; margin-top: 10px; padding: 5px; max-width: 800px">
			<b>{{ message.subject }}</b>
			<br />
			from {{ message.sender.emailAddress.name }} [{{ message.sender.emailAddress.address }}]
			<br />
			<div v-html="message.body.content"></div>
		</div>

  </div>
</template>

<script>
import BaseButton from "@/components/utils/BaseButton";

export default {
  name: 'EmailPage',
	components: {BaseButton},
	data() {
    return {
      isLoading: true,
      message: {}
    }
  },
  async created() {
    let id = this.$route.params.id
    this.message = await this.$store.state.graphClient.api("/me/messages/" + id).get()
    this.isLoading = false
  },
  methods: {
    handleClickGoBack() {
      this.$router.push("/emails");
    }
  }
}
</script>
