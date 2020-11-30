<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? "移动到收件箱 (e)" : "归档 (e)" }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? "标记为未读 (r)" : "标记为已读 (r)" }}
      </button>
      <button @click="goNewer">上一封 (k)</button>
      <button @click="goOlder">下一封 (j)</button>
    </div>
    <h2 class="mb-0">
      标题: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <h4>来自: {{ email.from }}</h4>
      <h4>时间: {{ format(new Date(email.sentAt), "yyyy年MM月d日") }}</h4>
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from "date-fns";
import marked from "marked";

import useKeydown from "@/composition/useKeydown";

export default {
  setup(props, { emit }) {
    // let email = props.email;
    // let toggleRead = () => {
    //   email.read = !email.read
    //   axios.put(`http://localhost:3000/emails/${email.id}`, email)
    // }
    // let toggleArchive = () => {
    //   email.archived = !email.archived
    //   axios.put(`http://localhost:3000/emails/${email.id}`, email)
    // }
    let toggleRead = () => {
      emit("change-email", { toggleRead: true, save: true });
    };
    let toggleArchive = () => {
      emit("change-email", {
        toggleArchive: true,
        save: true,
        closeModal: true,
      });
    };
    let goNewer = () => {
      emit("change-email", { changeIndex: -1 });
    };
    let goOlder = () => {
      emit("change-email", { changeIndex: 1 });
    };
    let goNewerAndArchive = () => {
      emit("change-email", {
        changeIndex: -1,
        toggleArchive: true,
        save: true,
      });
    };
    let goOlderAndArchive = () => {
      emit("change-email", { changeIndex: 1, toggleArchive: true, save: true });
    };

    useKeydown([
      { key: "r", fn: toggleRead },
      { key: "e", fn: toggleArchive },
      { key: "k", fn: goNewer },
      { key: "j", fn: goOlder },
      { key: "[", fn: goNewerAndArchive },
      { key: "]", fn: goOlderAndArchive },
    ]);

    return {
      format,
      marked,
      toggleRead,
      toggleArchive,
      goNewer,
      goOlder,
    };
  },
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>