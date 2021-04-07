<template>
  <div class="container">
    <div>
      <h1 class="text-4xl font-semibold text-gray-800 m-2 mb-8">
        DoingITeasyChannel - Nuxt-series
      </h1>
      <nuxt-link to="create" class="bg-purple-700 rounded p-2 text-white font-semibold m-2">
        Create Character
      </nuxt-link>
      <div class="flex">
        <ul class="w-64 px-2 text-gray-600">
          <li v-for="character in characters" :key="character.id">
            <nuxt-link
              :to="character.id"
              class="hover:font-bold hover:text-gray-900 leading-loose"
            >
              {{ character.name }}
            </nuxt-link>
          </li>
        </ul>
        <div class="flex-grow bg-white min-h-full">
          <nuxt-child :key="$route.params.id"></nuxt-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  async asyncData({ app, redirect }) {
    const result = await app.apolloProvider.defaultClient.query({
      query: gql `
        query getCharacters {
          characters {
            id
            name
          }
        }
      `
    })

    redirect('/' + result.data.characters[0].id)
    return result.data
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  width: 800px;
  margin: 0 auto;
}
</style>
