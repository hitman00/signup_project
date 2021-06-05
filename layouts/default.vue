<template>
  <div>
    <v-app>
      <v-main :class="$style.bcg_color">
        <v-container>
          <div style="height: 100vh" class="d-flex align-center">
            <v-col cols="8" class="mx-auto">
              <nuxt />
            </v-col>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
.bcg_color {
  // background: radial-gradient(
  //   circle,
  //   rgba(36, 78, 94, 1) 0%,
  //   rgba(55, 112, 132, 1) 22%,
  //   rgba(55, 112, 132, 1) 50%,
  //   rgba(55, 112, 132, 1) 76%,
  //   rgba(36, 78, 94, 1) 100%
  // );
  background: radial-gradient(
    circle,
    rgba(36, 78, 94, 1) 0%,
    rgba(114, 174, 196, 1) 22%,
    rgba(25, 168, 219, 1) 50%,
    rgba(5, 92, 123, 1) 76%,
    rgba(36, 78, 94, 1) 100%
  );
}
</style>
