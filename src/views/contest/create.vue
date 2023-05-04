<template>
  <contest-detail :is-edit="false" />
</template>

<script>
import ContestDetail from './components/ContestDetail'

export default {
  name: 'CreateContest',
  components: { ContestDetail }
}
</script>

