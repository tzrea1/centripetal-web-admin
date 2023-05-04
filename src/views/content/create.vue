<template>
  <content-detail :is-edit="false" />
</template>

<script>
import ContentDetail from './components/ContentDetail'

export default {
  name: 'CreateContent',
  components: { ContentDetail }
}
</script>

