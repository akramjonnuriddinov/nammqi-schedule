<template>
  <header x-data="{ isOpen: false }" class="bg-white shadow-md w-full z-50">
    <nav class="container mx-auto px-6 py-3">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <a href="#" class="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700">
            <img
              src="./images/logo-removebg-preview.png"
              alt="Logo"
              class="h-8 w-8 mr-2 inline-block"
            />
            Abdul Basit Memon
          </a>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#home" class="navbar-item text-gray-800 hover:text-indigo-600">Home</a>
          <a href="#about" class="navbar-item text-gray-800 hover:text-indigo-600">About</a>
          <a href="#projects" class="navbar-item text-gray-800 hover:text-indigo-600">Projects</a>
          <a href="#services" class="navbar-item text-gray-800 hover:text-indigo-600">Services</a>
          <a href="#contact" class="navbar-item text-gray-800 hover:text-indigo-600">Contact</a>
          <a
            href="https://nas.io/prologware-solutions-3"
            target="_blank"
            class="btn-primary text-white px-4 py-2 rounded-md"
            >Join Us</a
          >
        </div>
        <div class="md:hidden flex items-center">
          <button class="outline-none mobile-menu-button">
            <svg
              class="w-6 h-6 text-gray-500 hover:text-indigo-600"
              x-show="!isOpen"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg
              class="w-6 h-6 text-gray-500 hover:text-indigo-600"
              x-show="isOpen"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div x-show="isOpen" class="md:hidden mt-3">
        <a
          href="#home"
          class="block py-2 px-4 text-sm hover:bg-indigo-600 hover:text-white rounded transition duration-200"
          >Home</a
        >
        <a
          href="#about"
          class="block py-2 px-4 text-sm hover:bg-indigo-600 hover:text-white rounded transition duration-200"
          >About</a
        >
        <a
          href="#projects"
          class="block py-2 px-4 text-sm hover:bg-indigo-600 hover:text-white rounded transition duration-200"
          >Projects</a
        >
        <a
          href="#services"
          class="block py-2 px-4 text-sm hover:bg-indigo-600 hover:text-white rounded transition duration-200"
          >Services</a
        >
        <a
          href="#contact"
          class="block py-2 px-4 text-sm hover:bg-indigo-600 hover:text-white rounded transition duration-200"
          >Contact</a
        >
        <a
          href="https://nas.io/prologware-solutions-3"
          target="_blank"
          class="block py-2 px-4 text-sm bg-indigo-600 text-white rounded mt-2"
          >Join Us</a
        >
      </div>
    </nav>
  </header>
</template>
