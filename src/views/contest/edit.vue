<template>
  <contest-detail :is-edit="true" />
</template>

<script>
import ContestDetail from './components/ContestDetail'

export default {
  name: 'EditContest',
  components: { ContestDetail }
}
</script>

