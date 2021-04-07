<template>
  <div
    v-if="!$apollo.queries.character.loading"
    class="flex rounded border m-2"
  >
    <img :src="character.image" />
    <div class="p-2">
      <span>{{ character.status }}</span>
      <h3 class="font-semibold">{{ character.name }}</h3>
      <p>{{ character.gender }}</p>
      <!-- <p>{{ character.origin.name }}</p> -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default ({
  name: 'Character',
  apollo: {
    character: {
      query: gql`
        query getCharacter($id: ID!) {
          character(id: $id) {
            id
            name
            status
            gender
            image
            # origin {
            #   name
            # }
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  }
})
</script>

<style>
img {
  width: 250px;
}
</style>
