<template>
	<br />
	<BaseButton :onclick="handleClickGoBack">Back to home</BaseButton>
  <h1>Your e-mails</h1>

  <div v-if="isLoading">
    <i>Loading...</i>
  </div>
  <div v-else>
    You have {{messages.length}}
    <a v-if="messages.length > 1"> e-mails. </a>
    <a v-else> e-mail. </a>
    <br />
    <div v-if="messages.length > 0">
			<br />
      <span>Filter by sender :</span> <input type="text" v-model="filterSender" /> <br />
      <span>Filter by keywords : </span> <input type="text" v-model="filterKeywords" /> <br />
      <span>Filter by date-time :</span> <input type="date" v-model="filterDate" /> <br />

      <div v-if="(filterSender && filterSender.length > 0) || (filterKeywords && filterKeywords.length > 0) || filterDate">
        Matching filter : {{ filteredMessages.length }}
        <a v-if="filteredMessages.length > 1"> e-mails. </a>
        <a v-else> e-mail. </a>
        <BaseButton color="#e62143" :onClick="handleClearFilters">Clear filters</BaseButton>
      </div>

      <br />

      <div v-for="m in filteredMessages"
           v-bind:key="m.id"
           style="border: 1px solid grey; margin-top: 10px; padding: 5px; max-width: 800px"
			>
        <b>{{ m.subject }}</b>
				<BaseButton style="margin-left: 5px" :onclick="() => handleClickEmail(m)">View</BaseButton>
				<br />
				from {{ m.sender.emailAddress.name }} [{{ m.sender.emailAddress.address }}]
				<br />
        <i>{{ m.bodyPreview }}</i>...
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/utils/BaseButton";

export default {
  name: 'EmailsPage',
	components: {BaseButton},
  data() {
    return {
      isLoading: true,
      messages: [],
      filterSender: "",
      filterKeywords: "",
      filterDate: null,
    }
  },
  async created() {
    this.messages = (await this.$store.state.graphClient.api("/me/messages").get()).value
    this.isLoading = false
  },
  computed: {
    user() {
      return this.$store.state.msalInstance.getActiveAccount()
    },
    filteredMessages() {
      let messages = this.messages;
      if (this.filterSender && this.filterSender.length !== 0) {
        messages = messages.filter(m => m.sender.emailAddress.address.toLowerCase().includes(this.filterSender.toLowerCase()) || m.sender.emailAddress.name.toLowerCase().includes(this.filterSender.toLowerCase()))
      }
      if (this.filterKeywords && this.filterKeywords.length !== 0) {
        messages = messages.filter(m => m.subject.toLowerCase().includes(this.filterKeywords.toLowerCase()) || m.body.content.toLowerCase().includes(this.filterKeywords.toLowerCase()))
      }
      if (this.filterDate) {
        messages = messages.filter(m => {
					let date = new Date(m.receivedDateTime)
					let filterDate = new Date(this.filterDate)
					return date.getFullYear() === filterDate.getFullYear() && date.getMonth() === filterDate.getMonth() && date.getDate() === filterDate.getDate()
				})
      }
      return messages;
    }
  },
  methods: {
    handleClickEmail(email) {
      this.$router.push("/emails/" + email.id);
    },
    handleClickGoBack() {
      this.$router.push("/");
    },
    handleClearFilters() {
      this.filterSender = ""
      this.filterKeywords = ""
      this.filterDate = ""
    }
  }
}
</script>
