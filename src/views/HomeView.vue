<script setup lang="ts"></script>

<template>
  <div
    class="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5"
    data-aos="fade-right"
    data-aos-duration="800"
  >
    <div class="pr-2 md:mb-14 py-14 md:py-0">
      <h1 class="text-3xl font-semibold text-slate-900 xl:text-5xl lg:text-3xl">
        <span class="block w-full">Namangan Muhandislik</span> Qurilish Instituti
      </h1>
      <p class="py-4 text-lg text-slate-800 2xl:py-8 md:py-6 2xl:pr-5">Dars jadvali</p>
      <div class="mt-4">
        <router-link
          to="/schedule"
          class="px-5 py-3 text-lg tracking-wider text-white bg-slate-800 rounded-lg md:px-8 hover:bg-slate-900 transition-colors group"
          ><span>Dars jadvali</span>
        </router-link>
      </div>
    </div>

    <div class="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
      <img
        id="heroImg1"
        class="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
        src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
        alt="Awesome hero page image"
        width="500"
        height="488"
      />
    </div>
  </div>
</template>

<!-- <template>
  <main>
    <main
      class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20"
    >
      <div
        target="_blank"
        rel="noreferrer"
        class="border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out"
      >
        Dars jadvali <span class="font-semibold">nammqi.uz</span>
      </div>
      <h1
        class="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl"
      >
        Namangan Muhandislik Qurilish Instituti
        <span class="relative whitespace-nowrap text-orange-400">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            class="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-300/70"
            preserveAspectRatio="none"
          >
            <path
              d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
            ></path>
          </svg>
          <span class="relative">Pop</span>
        </span>
      </h1>
      <p class="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">Dars jadvali</p>
      <a
        class="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
        href="#"
        >Boshlash →
      </a>
    </main>
  </main>
</template> -->
