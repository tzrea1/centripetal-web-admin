<template>
  <content-detail :is-edit="true" />
</template>

<script>
import ContentDetail from './components/ContentDetail'

export default {
  name: 'EditForm',
  components: { ContentDetail }
}
</script>

