<template>
  <div class="footer">
    <h4 class="maj" v-for="link in links" :key="link.alias">
      <router-link class="maj" :to="link.url">{{link.title }}</router-link>
    </h4>
  </div>
</template>

<script>
import { app, links } from "@/_config";

export default {
  name: "FooterPage",
  data() {
    return {
      title : app.title,
      links: links,
    };
  }
}
</script>

<style>
.footer {
  background-color: #462a32;
  overflow: hidden;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.footer h4:hover{
  background : #ececec;
  color: #c76565;

}
</style>
