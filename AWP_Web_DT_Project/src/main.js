import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from 'vue'

import App from './App.vue'
import store from "@/store";
import router from "@/router";

library.add(faPhone);

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')

router.beforeEach(to => {
	if (to.path.startsWith("/emails")) {
		return !!store.state.msalInstance.getActiveAccount()
	}
	return true
})
