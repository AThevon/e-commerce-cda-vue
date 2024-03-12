import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

export default {
   install: (app: any) => {
      app.component("FontAwesomeIcon", FontAwesomeIcon);
   },
};
