<script setup>
/**
 * BaseCarousel.vue
 * Carrusel avanzado con capa de información (UI Layer).
 * Corrección: Usa CSS absoluto en lugar de v-overlay para permitir clic en flechas.
 */
  import { computed, shallowRef } from 'vue'

  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
    height: {
      type: [String, Number],
      default: 400,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    progressColor: {
      type: String,
      default: 'primary',
    },
    showOverlay: {
      type: Boolean,
      default: true,
    },
    cycleInterval: {
      type: Number,
      default: 0,
    },
  })

  const currentIndex = shallowRef(0)
  const currentItem = computed(() => props.items[currentIndex.value] || {})
</script>

<template>
  <v-sheet
    border
    class="overflow-hidden position-relative carousel-wrapper"
    elevation="0"
    rounded="xl"
  >
    <v-carousel
      v-model="currentIndex"
      :cycle="cycleInterval > 0"
      :direction="vertical ? 'vertical' : 'horizontal'"
      :height="height"
      hide-delimiter-background
      :interval="cycleInterval"
      :progress="progressColor"
      show-arrows="hover"
      :vertical-arrows="vertical"
      :vertical-delimiters="vertical ? 'right' : undefined"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        cover
        :src="item.src"
      />
    </v-carousel>

    <!--
      CAPA DE UI FLOTANTE (Reemplazo de v-overlay)
      Esta capa está posicionada absolutamente sobre el carrusel.
      Tiene pointer-events: none para que los clics pasen a través de ella
      y lleguen a las flechas del carrusel.
    -->
    <div v-if="showOverlay" class="carousel-ui-layer">

      <!-- ZONA SUPERIOR: INFO DEL ITEM -->
      <!-- Wrapper interno con pointer-events: auto para permitir interacción con la tarjeta -->
      <div class="ui-content-wrapper">
        <v-scroll-x-transition mode="out-in">
          <div :key="currentIndex" class="mt-4">
            <slot :item="currentItem" name="info">
              <!-- Diseño por Defecto -->
              <v-sheet
                v-if="currentItem.title || currentItem.subtitle"
                class="px-2"
                color="surface"
                elevation="2"
                rounded="xl"
              >
                <v-list-item
                  class="pa-2 pr-6"
                  :prepend-avatar="currentItem.avatar"
                  :subtitle="currentItem.subtitle"
                  :title="currentItem.title"
                >
                  <template #append>
                    <v-icon color="primary" size="small">mdi-check-decagram</v-icon>
                  </template>
                </v-list-item>
              </v-sheet>
            </slot>
          </div>
        </v-scroll-x-transition>
      </div>

    </div>
  </v-sheet>
</template>

<style scoped>
/*
  El wrapper principal. position: relative es clave para que los hijos
  absolutos se posicionen respecto a este elemento.
*/
.carousel-wrapper {
  position: relative;
}

/*
  La capa mágica.
  Ocupa el espacio (inset: 0), pero es invisible a los clics (pointer-events: none).
  Esto permite que si haces clic en un área vacía (donde están las flechas),
  el clic atraviese esta capa y active el carrusel.
*/
.carousel-ui-layer {
  position: absolute;
  inset: 0;
  z-index: 2; /* Por encima del carrusel (que suele ser z-index 1) */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Separa info arriba y chip abajo */
  align-items: center;
  padding: 16px;
  pointer-events: none;
}

/*
  Reactivamos los clics SOLO en los elementos que tienen contenido real
  (la tarjeta de información y el chip del contador).
*/
.ui-content-wrapper {
  pointer-events: auto;
}
</style>
