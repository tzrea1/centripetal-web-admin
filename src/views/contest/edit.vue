<template>
  <update-quiz :is-edit="true" />
</template>

<script>
import UpdateQuiz from './components/UpdateQuiz.vue'

export default {
  name: 'EditContest',
  components: { UpdateQuiz }
}
</script>

