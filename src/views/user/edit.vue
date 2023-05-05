<template>
  <update-user-info :is-edit="true" />
</template>

<script>
import UpdateUserInfo from './components/UpdateUserInfo.vue'

export default {
  name: 'EditUser',
  components: { UpdateUserInfo }
}
</script>

