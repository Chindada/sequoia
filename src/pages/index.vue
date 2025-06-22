<script setup lang="ts">
import { ref } from "vue";

import { useLayout } from "@/components/layouts/composables/layout";

const features = [
  "Arcu vitae elementum",
  "Dui faucibus in ornare",
  "Morbi tincidunt augue",
  "Duis ultricies lacus sed"
];
const checked = ref(true);
const stats = ref([
  {
    icon: "pi pi-users",
    title: "83M",
    description: "Nostrum laborum accusamus quia iste facere possimus."
  },
  {
    icon: "pi pi-chart-line",
    title: "$256K",
    description: "Nostrum laborum accusamus quia iste facere possimus."
  },
  {
    icon: "pi pi-globe",
    title: "1,453",
    description: "Nostrum laborum accusamus quia iste facere possimus."
  },
  {
    icon: "pi pi-map",
    title: "45 km",
    description: "Nostrum laborum accusamus quia iste facere possimus."
  }
]);
const blogs = ref([
  {
    category: "Crime",
    color: "blue",
    title: "Fugitive flamingo spotted in Florida",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    cover:
      "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/blog/blog-1.jpg",
    author: {
      name: "Anna Lane",
      image:
        "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-1.png"
    },
    date: "Apr 5, 202X"
  },
  {
    category: "Wildlife",
    color: "pink",
    title: "To the Ends of the Earth",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    cover:
      "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/blog/blog-2.jpg",
    author: {
      name: "Arlene McCoy",
      image:
        "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-2.png"
    },
    date: "Apr 5, 202X"
  },
  {
    category: "Marine",
    color: "orange",
    title: "'Real and imminent' extinction risk",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    cover:
      "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/blog/blog-3.jpg",
    author: {
      name: "Floyd Miles",
      image:
        "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-3.png"
    },
    date: "Apr 5, 202X"
  }
]);
const contact = ref({
  name: "",
  company: "",
  email: "",
  budget: "",
  message: ""
});

const isDarkMode = ref(useLayout().isDarkTheme);
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-950 min-h-screen">
    <div
      class="bg-surface-900 text-surface-100 flex flex-wrap items-center justify-between px-6 py-4 lg:px-20"
    >
      <div class="font-bold">🔥 Hot Deals!</div>
      <div class="inline-flex items-center gap-1">
        <span class="hidden leading-normal lg:flex"
          >Libero voluptatum atque exercitationem praesentium provident odit.</span
        >
        <a class="text-surface-0 font-bold underline" href="#">Learn More</a>
      </div>
      <Button
        class="!text-surface-0 hover:!bg-surface-500/20"
        icon="pi pi-times"
        rounded
        severity="secondary"
        text
      />
    </div>
    <div
      class="bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-800 relative flex items-center justify-between border-b px-12 py-4 lg:static"
    >
      <div class="flex items-center gap-4 py-2">
        <svg
          fill="none"
          height="32"
          viewBox="0 0 32 32"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="fill-surface-900 dark:fill-surface-0"
            clip-rule="evenodd"
            d="M6.84219 2.87829C5.69766 3.67858 4.6627 4.62478 3.76426 5.68992C7.4357 5.34906 12.1001 5.90564 17.5155 8.61335C23.2984 11.5047 27.955 11.6025 31.1958 10.9773C30.9017 10.087 30.5315 9.23135 30.093 8.41791C26.3832 8.80919 21.6272 8.29127 16.0845 5.51998C12.5648 3.76014 9.46221 3.03521 6.84219 2.87829ZM27.9259 5.33332C24.9962 2.06 20.7387 0 16 0C14.6084 0 13.2581 0.177686 11.9709 0.511584C13.7143 0.987269 15.5663 1.68319 17.5155 2.65781C21.5736 4.68682 25.0771 5.34013 27.9259 5.33332ZM31.8887 14.1025C27.9735 14.8756 22.567 14.7168 16.0845 11.4755C10.024 8.44527 5.20035 8.48343 1.94712 9.20639C1.7792 9.24367 1.61523 9.28287 1.45522 9.32367C1.0293 10.25 0.689308 11.2241 0.445362 12.2356C0.705909 12.166 0.975145 12.0998 1.25293 12.0381C5.19966 11.161 10.7761 11.1991 17.5155 14.5689C23.5761 17.5991 28.3997 17.561 31.6529 16.838C31.7644 16.8133 31.8742 16.7877 31.9822 16.7613C31.9941 16.509 32 16.2552 32 16C32 15.358 31.9622 14.7248 31.8887 14.1025ZM31.4598 20.1378C27.5826 20.8157 22.3336 20.5555 16.0845 17.431C10.024 14.4008 5.20035 14.439 1.94712 15.1619C1.225 15.3223 0.575392 15.5178 0.002344 15.7241C0.000781601 15.8158 0 15.9078 0 16C0 24.8366 7.16344 32 16 32C23.4057 32 29.6362 26.9687 31.4598 20.1378Z"
            fill-rule="evenodd"
          />
        </svg>
        <span class="text-surface-900 dark:text-surface-0 text-xl font-medium">Trimzales</span>
      </div>

      <a
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          leaveToClass: 'hidden',
          hideOnOutsideClick: true
        }"
        class="text-surface-700 dark:text-surface-100 mt-1 block cursor-pointer lg:hidden"
      >
        <i class="pi pi-bars !text-2xl" />
      </a>
      <div
        class="bg-surface-0 dark:bg-surface-900 absolute top-full left-0 z-50 hidden w-full grow items-center justify-between px-12 shadow lg:static lg:flex lg:px-0 lg:shadow-none"
      >
        <ul
          class="text-surface-900 dark:text-surface-0 m-0 flex grow cursor-pointer list-none flex-col p-0 py-4 select-none lg:flex-row lg:items-center lg:justify-center lg:py-0"
        >
          <li class="relative">
            <a
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true
              }"
              class="hover:text-primary flex items-center px-0 py-2 font-medium transition-colors duration-150 lg:px-8"
            >
              <span>Products</span>
              <i class="pi pi-angle-down ml-auto lg:ml-4" />
            </a>
            <ul
              class="rounded-border shadow-0 bg-surface-0 dark:bg-surface-900 top-20 m-0 hidden w-full origin-top list-none p-1 lg:absolute lg:w-60 lg:shadow"
            >
              <li>
                <a
                  class="hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center gap-2 rounded px-4 py-2 transition-colors duration-150"
                >
                  <i class="pi pi-th-large" />
                  <span>Features</span>
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center gap-2 rounded px-4 py-2 transition-colors duration-150"
                >
                  <i class="pi pi-microchip" />
                  <span>Solutions</span>
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center gap-2 rounded px-4 py-2 transition-colors duration-150"
                >
                  <i class="pi pi-users" />
                  <span>Customers</span>
                </a>
              </li>
              <li class="relative">
                <a
                  v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-scalein',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-fadeout',
                    hideOnOutsideClick: true
                  }"
                  class="hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center gap-2 rounded px-4 py-2 transition-colors duration-150"
                >
                  <i class="pi pi-lightbulb" />
                  <span>Support</span>
                  <i class="pi pi-angle-down ml-auto lg:-rotate-90" />
                </a>
                <ul
                  class="rounded-border shadow-0 bg-surface-0 dark:bg-surface-900 top-0 left-full ml-2 hidden w-full origin-top cursor-pointer list-none p-1 pl-4 lg:absolute lg:w-60 lg:pl-1 lg:shadow"
                >
                  <li>
                    <a
                      class="hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center gap-2 rounded px-4 py-2 transition-colors duration-150"
                    >
                      <i class="pi pi-user" />
                      <span>Help Center</span>
                    </a>
                  </li>
                  <li class="relative">
                    <a
                      class="hover:bg-surface-100 dark:hover:bg-surface-800 flex items-center gap-2 rounded px-4 py-2 transition-colors duration-150"
                    >
                      <i class="pi pi-question-circle" />
                      <span>Faq</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a
              class="hover:text-primary flex px-0 py-2 font-medium transition-colors duration-150 lg:px-8"
            >
              <span>Corporate</span>
            </a>
          </li>
          <li>
            <a
              class="hover:text-primary flex px-0 py-2 font-medium transition-colors duration-150 lg:px-8"
            >
              <span>Resources</span>
            </a>
          </li>
          <li>
            <a
              class="hover:text-primary flex px-0 py-2 font-medium transition-colors duration-150 lg:px-8"
            >
              <span>Pricing</span>
            </a>
          </li>
        </ul>
        <div class="border-surface mt-4 flex gap-4 border-t py-4 lg:mt-0 lg:border-t-0 lg:py-0">
          <Button label="Login" text />
          <Button label="Register" />
        </div>
      </div>
    </div>
    <div
      class="from-primary/10 flex flex-col items-center overflow-hidden bg-gradient-to-t from-10% to-transparent p-12 !pb-0 text-center lg:p-20"
    >
      <div
        class="bg-primary-100 dark:bg-primary-400/20 text-primary-700 dark:text-primary-100 border-primary-200 dark:border-primary-500/30 mx-auto mb-6 rounded-full border p-2 px-4 backdrop-blur-sm"
      >
        🔥 Get started in no time
      </div>
      <div
        class="text-surface-900 dark:text-surface-0 mb-1 text-4xl leading-tight font-bold lg:text-5xl"
      >
        Highly Customizable
      </div>
      <div class="text-primary mb-6 text-4xl leading-tight font-bold lg:text-5xl">
        Premium Application Template
      </div>
      <Button label="Get Started" outlined type="button" />
      <div class="mt-12 flex w-full grow items-start justify-center rounded-t-3xl">
        <div
          class="border-primary-100 dark:border-primary-400/30 aspect-[720/295] w-full max-w-[720px] overflow-hidden rounded-t-3xl border border-b-0 shadow-2xl"
        >
          <img
            alt="Image"
            class="block h-full w-full rounded-t-3xl object-cover object-top"
            :src="
              isDarkMode
                ? 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/hero/hero-product-dark.jpg'
                : 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/hero/hero-product.jpg'
            "
          />
        </div>
      </div>
    </div>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 text-center md:px-12 lg:px-20">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col items-center gap-4">
          <div class="text-3xl leading-tight font-bold">
            <span class="text-surface-900 dark:text-surface-0">One Product, </span>
            <span class="text-primary-500 dark:text-primary-400">Many Solutions</span>
          </div>
          <div class="text-surface-500 dark:text-surface-400 leading-tight">
            Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div class="w-full rounded-md p-4">
            <span
              class="bg-surface-0 dark:bg-surface-800 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg shadow"
            >
              <i
                class="pi pi-desktop text-primary-500 dark:text-primary-400 !text-2xl lg:!text-3xl"
              />
            </span>
            <div class="flex flex-col gap-1">
              <div class="text-surface-900 dark:text-surface-0 text-xl leading-tight font-medium">
                Built for Developers
              </div>
              <p class="text-surface-500 dark:text-surface-400 leading-normal">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
            </div>
          </div>
          <div class="w-full rounded-md p-4">
            <span
              class="bg-surface-0 dark:bg-surface-800 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg shadow"
            >
              <i class="pi pi-lock text-primary-500 dark:text-primary-400 !text-2xl lg:!text-3xl" />
            </span>
            <div class="flex flex-col gap-1">
              <div class="text-surface-900 dark:text-surface-0 text-xl leading-tight font-medium">
                End-to-End Encryption
              </div>
              <p class="text-surface-500 dark:text-surface-400 leading-normal">
                Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam
                ultrices sagittis.
              </p>
            </div>
          </div>
          <div class="w-full rounded-md p-4">
            <span
              class="bg-surface-0 dark:bg-surface-800 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg shadow"
            >
              <i
                class="pi pi-face-smile text-primary-500 dark:text-primary-400 !text-2xl lg:!text-3xl"
              />
            </span>
            <div class="flex flex-col gap-1">
              <div class="text-surface-900 dark:text-surface-0 text-xl leading-tight font-medium">
                Easy to Use
              </div>
              <p class="text-surface-500 dark:text-surface-400 leading-normal">
                Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt
                vitae semper.
              </p>
            </div>
          </div>
          <div class="w-full rounded-md p-4">
            <span
              class="bg-surface-0 dark:bg-surface-800 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg shadow"
            >
              <i
                class="pi pi-globe text-primary-500 dark:text-primary-400 !text-2xl lg:!text-3xl"
              />
            </span>
            <div class="flex flex-col gap-1">
              <div class="text-surface-900 dark:text-surface-0 text-xl leading-tight font-medium">
                Fast & Global Support
              </div>
              <p class="text-surface-500 dark:text-surface-400 leading-normal">
                Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.
              </p>
            </div>
          </div>
          <div class="w-full rounded-md p-4">
            <span
              class="bg-surface-0 dark:bg-surface-800 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg shadow"
            >
              <i
                class="pi pi-github text-primary-500 dark:text-primary-400 !text-2xl lg:!text-3xl"
              />
            </span>
            <div class="flex flex-col gap-1">
              <div class="text-surface-900 dark:text-surface-0 text-xl leading-tight font-medium">
                Open Source
              </div>
              <p class="text-surface-500 dark:text-surface-400 leading-normal">
                Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing
                tristique risus nec feugiat.
              </p>
            </div>
          </div>
          <div class="w-full rounded-md p-4">
            <span
              class="bg-surface-0 dark:bg-surface-800 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg shadow"
            >
              <i
                class="pi pi-shield text-primary-500 dark:text-primary-400 !text-2xl lg:!text-3xl"
              />
            </span>
            <div class="flex flex-col gap-1">
              <div class="text-surface-900 dark:text-surface-0 text-xl leading-tight font-medium">
                Trusted Security
              </div>
              <p class="text-surface-500 dark:text-surface-400 leading-normal">
                Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam
                eleifend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div
          class="from-primary-600 to-primary-500/50 flex flex-col justify-between rounded-2xl bg-gradient-to-r p-12 shadow md:flex-row md:items-center"
        >
          <div class="flex flex-col gap-4 pr-12">
            <div class="text-primary-200 text-lg leading-tight font-medium">TAKE THE NEXT STEP</div>
            <div class="text-surface-0 text-4xl leading-tight font-medium">
              Empower your customer experience
            </div>
          </div>
          <div class="mt-6 w-full md:mt-0 md:w-auto">
            <Button class="w-fit shrink-0" label="Get Started" rounded severity="contrast" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-surface-50 dark:bg-surface-900 flex flex-col items-center justify-center gap-12 p-20"
    >
      <div class="flex flex-col items-center gap-4">
        <div
          class="text-surface-900 dark:text-surface-0 text-center text-4xl leading-tight font-bold"
        >
          Continue Breaking Records
        </div>
        <div
          class="text-surface-600 dark:text-surface-200 text-center text-lg leading-normal font-normal"
        >
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </div>
      </div>

      <div class="bg-surface-0 dark:bg-surface-800 rounded-xl p-8 shadow-sm">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) of stats" :key="index" class="flex flex-col gap-6 p-2">
            <div class="flex flex-col gap-6">
              <i class="text-primary !text-4xl" :class="item.icon" />
              <div
                class="text-surface-900 dark:text-surface-0 text-3xl leading-tight font-semibold"
              >
                {{ item.title }}
              </div>
            </div>
            <div class="text-surface-500 dark:text-surface-400 leading-normal font-normal">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <div class="flex flex-col items-center gap-4">
        <h1
          class="text-surface-900 dark:text-surface-0 mb-4 text-center text-5xl leading-normal font-bold"
        >
          Trusted By
        </h1>
        <h3 class="text-surface-600 dark:text-surface-200 mb-12 text-center text-xl leading-normal">
          We provide many of the Planet Earth's most powerful companies with extraordinary
          infrastructural capabilities.
        </h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div
          class="bg-surface-0 dark:bg-surface-950 before:from-surface-200 dark:before:from-surface-800 after:from-surface-200 dark:after:from-surface-800 relative flex items-center justify-center p-8 before:absolute before:right-0 before:bottom-0 before:hidden before:h-full before:w-px before:bg-gradient-to-t before:to-transparent after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-px after:bg-gradient-to-l after:to-transparent sm:pl-20 sm:before:block sm:after:block lg:pl-8"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                clip-rule="evenodd"
                d="M11.2217 0C9.41656 0 7.68544 0.71707 6.40905 1.99346L2.24348 6.159C0.967076 7.4354 0.25 9.16657 0.25 10.9717C0.25 12.9634 1.10555 14.7554 2.46921 16C1.10555 17.2446 0.25 19.0366 0.25 21.0283C0.25 22.8334 0.967075 24.5646 2.24348 25.841L6.40905 30.0066C7.68544 31.283 9.41656 32 11.2217 32C13.2134 32 15.0054 31.1445 16.25 29.7808C17.4946 31.1445 19.2866 32 21.2783 32C23.0834 32 24.8146 31.283 26.091 30.0066L30.2565 25.841C31.5329 24.5646 32.25 22.8334 32.25 21.0283C32.25 19.0366 31.3945 17.2446 30.0308 16C31.3945 14.7554 32.25 12.9634 32.25 10.9717C32.25 9.16657 31.5329 7.4354 30.2565 6.159L26.091 1.99346C24.8146 0.71707 23.0834 0 21.2783 0C19.2866 0 17.4946 0.85555 16.25 2.21921C15.0054 0.85555 13.2134 0 11.2217 0ZM20.6313 16.2157C20.7498 16.0971 20.7498 15.9028 20.6313 15.7843L18.3713 13.5244C17.1997 12.3528 15.3003 12.3528 14.1287 13.5244L11.8687 15.7843C11.7502 15.9028 11.7502 16.0971 11.8687 16.2157L14.1287 18.4756C15.3003 19.6472 17.1997 19.6472 18.3713 18.4756L20.6313 16.2157ZM18.9798 22.8955C18.3702 23.5051 18.0278 24.3318 18.0278 25.1939C18.0278 26.9891 19.4831 28.4445 21.2783 28.4445C22.1404 28.4445 22.9672 28.102 23.5768 27.4924L27.7424 23.3268C28.352 22.7172 28.6945 21.8904 28.6945 21.0283C28.6945 19.2331 27.2391 17.7778 25.4439 17.7778C24.5818 17.7778 23.755 18.1202 23.1454 18.7298L18.9798 22.8955ZM14.4722 25.1939C14.4722 24.3318 14.1298 23.5051 13.5202 22.8955L9.35456 18.7298C8.74496 18.1202 7.91819 17.7778 7.0561 17.7778C5.26087 17.7778 3.80555 19.2331 3.80555 21.0283C3.80555 21.8904 4.14801 22.7172 4.7576 23.3268L8.9232 27.4924C9.5328 28.102 10.3596 28.4445 11.2217 28.4445C13.0169 28.4445 14.4722 26.9891 14.4722 25.1939ZM14.4722 6.8061C14.4722 7.66817 14.1298 8.49493 13.5202 9.1045L9.35456 13.2702C8.74496 13.8798 7.91819 14.2222 7.0561 14.2222C5.26087 14.2222 3.80555 12.7669 3.80555 10.9717C3.80555 10.1096 4.14801 9.28281 4.7576 8.67322L8.9232 4.50762C9.5328 3.89802 10.3596 3.55556 11.2217 3.55556C13.0169 3.55556 14.4722 5.01087 14.4722 6.8061ZM23.1454 13.2702L18.9798 9.10451C18.3702 8.49493 18.0278 7.66817 18.0278 6.8061C18.0278 5.01087 19.4831 3.55556 21.2783 3.55556C22.1404 3.55556 22.9672 3.89802 23.5768 4.50762L27.7424 8.67323C28.352 9.28281 28.6945 10.1096 28.6945 10.9717C28.6945 12.7669 27.2391 14.2222 25.4439 14.2222C24.5818 14.2222 23.755 13.8798 23.1454 13.2702Z"
                fill-rule="evenodd"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >Mistranet</span
            >
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-950 lg:before:from-surface-200 dark:lg:before:from-surface-800 lg:after:bg-surface-200 lg:dark:after:bg-surface-800 after:from-surface-200 dark:after:from-surface-800 relative flex items-center justify-center p-8 after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-px after:bg-gradient-to-r after:to-transparent sm:pr-20 sm:after:block lg:pr-8 lg:before:absolute lg:before:right-0 lg:before:bottom-0 lg:before:h-full lg:before:w-px lg:before:bg-gradient-to-t lg:before:to-transparent"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                clip-rule="evenodd"
                d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
                fill-rule="evenodd"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >Trimzales</span
            >
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-950 before:bg-surface-200 dark:before:bg-surface-800 before:from-surface-200 dark:before:from-surface-800 lg:after:bg-surface-200 lg:dark:after:bg-surface-800 after:from-surface-200 dark:after:from-surface-800 relative flex items-center justify-center p-8 before:absolute before:right-0 before:bottom-0 before:hidden before:h-full before:w-px before:to-transparent after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-px after:bg-gradient-to-l after:to-transparent sm:pl-20 sm:before:block sm:after:block lg:pl-8 lg:before:bg-gradient-to-t"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M16.7494 21.3331C19.6949 21.3331 22.0827 18.9454 22.0827 15.9998C22.0827 13.0543 19.6949 10.6665 16.7494 10.6665C13.8038 10.6665 11.4161 13.0543 11.4161 15.9998C11.4161 18.9454 13.8038 21.3331 16.7494 21.3331Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M16.75 0C14.6489 0 12.5682 0.413897 10.627 1.21792C8.68582 2.02203 6.92207 3.20055 5.43626 4.68626C3.95055 6.17207 2.77203 7.93582 1.96792 9.87703C1.1639 11.8182 0.75 13.8989 0.75 16C0.75 18.1011 1.1639 20.1818 1.96792 22.123C2.77203 24.0642 3.95055 25.8279 5.43626 27.3137C6.92207 28.7994 8.68582 29.978 10.627 30.7821C12.5682 31.5861 14.6489 32 16.75 32V24C15.6994 24 14.6591 23.7931 13.6885 23.391C12.7179 22.989 11.836 22.3997 11.0931 21.6569C10.3503 20.914 9.76102 20.0321 9.359 19.0615C8.9569 18.0909 8.75 17.0506 8.75 16C8.75 14.9494 8.9569 13.9091 9.359 12.9385C9.76102 11.9679 10.3503 11.086 11.0931 10.3431C11.836 9.60028 12.7179 9.01102 13.6885 8.609C14.6591 8.2069 15.6994 8 16.75 8V0Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M0.75 16C0.75 18.1011 1.1639 20.1818 1.96792 22.123C2.77203 24.0642 3.95055 25.8279 5.43626 27.3137C6.92207 28.7994 8.68582 29.978 10.627 30.7821C12.5682 31.5861 14.6489 32 16.75 32C18.8511 32 20.9318 31.5861 22.873 30.7821C24.8142 29.978 26.5779 28.7994 28.0637 27.3137C29.5494 25.8279 30.728 24.0642 31.5321 22.123C32.3361 20.1818 32.75 18.1011 32.75 16H24.75C24.75 17.0506 24.5431 18.0909 24.141 19.0615C23.739 20.0321 23.1497 20.914 22.4069 21.6569C21.664 22.3997 20.7821 22.989 19.8115 23.391C18.8409 23.7931 17.8006 24 16.75 24C15.6994 24 14.6591 23.7931 13.6885 23.391C12.7179 22.989 11.836 22.3997 11.0931 21.6569C10.3503 20.914 9.76102 20.0321 9.359 19.0615C8.9569 18.0909 8.75 17.0506 8.75 16H0.75Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M22.0827 15.9998C22.0827 14.5853 21.5208 13.2289 20.5207 12.2287C19.5205 11.2284 18.1639 10.6665 16.7494 10.6665C15.3349 10.6665 13.9784 11.2284 12.9782 12.2287C11.978 13.2289 11.4161 14.5853 11.4161 15.9998H22.0827Z"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >Streamlinz</span
            >
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-950 after:from-surface-200 dark:after:from-surface-800 relative flex items-center justify-center p-8 after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-px after:bg-gradient-to-r after:to-transparent sm:pr-20 sm:after:block lg:pr-8"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                clip-rule="evenodd"
                d="M8.25 0C12.6682 0 16.25 3.58172 16.25 8V2C16.25 0.895431 17.1454 0 18.25 0H24.25C28.6682 0 32.25 3.58172 32.25 8C32.25 12.4182 28.6682 16 24.25 16C28.6682 16 32.25 19.5818 32.25 24C32.25 26.1938 31.3669 28.1814 29.9368 29.6267L29.9069 29.6569L29.8803 29.6833C28.4347 31.1154 26.4457 32 24.25 32C22.0693 32 20.0923 31.1274 18.6492 29.7124C18.6305 29.694 18.6118 29.6754 18.5931 29.6569C18.5756 29.6394 18.5582 29.6218 18.5408 29.6041C17.1239 28.1607 16.25 26.1824 16.25 24C16.25 28.4182 12.6682 32 8.25 32C3.83172 32 0.25 28.4182 0.25 24V18C0.25 16.8954 1.14543 16 2.25 16H8.25C3.83172 16 0.25 12.4182 0.25 8C0.25 3.58172 3.83172 0 8.25 0ZM14.65 8C14.65 11.5346 11.7846 14.4 8.25 14.4V1.6C11.7846 1.6 14.65 4.46538 14.65 8ZM30.65 24C30.65 20.4654 27.7846 17.6 24.25 17.6C20.7154 17.6 17.85 20.4654 17.85 24H30.65ZM2.35 17.6C2.07386 17.6 1.85 17.8239 1.85 18.1V24C1.85 27.5346 4.71538 30.4 8.25 30.4C11.7846 30.4 14.65 27.5346 14.65 24V17.6H2.35ZM17.85 14.4V2.1C17.85 1.82386 18.0739 1.6 18.35 1.6H24.25C27.7846 1.6 30.65 4.46538 30.65 8C30.65 11.5346 27.7846 14.4 24.25 14.4H17.85Z"
                fill-rule="evenodd"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >Limerantz</span
            >
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-950 before:bg-surface-200 dark:before:bg-surface-800 before:from-surface-200 dark:before:from-surface-800 after:from-surface-200 dark:after:from-surface-800 relative flex items-center justify-center p-8 before:absolute before:right-0 before:bottom-0 before:hidden before:h-full before:w-px before:to-transparent after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-px after:bg-gradient-to-l after:to-transparent after:opacity-100 sm:pl-20 sm:before:block sm:after:block lg:pl-8 lg:before:bg-transparent lg:before:bg-gradient-to-b lg:after:opacity-0 lg:before:dark:bg-transparent"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                clip-rule="evenodd"
                d="M21.1946 9.34824C19.0306 7.90236 16.75 5.89022 16.75 3.28768V0C19.9145 0 23.0079 0.938384 25.6391 2.69649C28.2703 4.45458 30.321 6.95345 31.5321 9.87704C32.743 12.8006 33.0599 16.0178 32.4426 19.1214C31.8252 22.2251 30.3014 25.0761 28.0637 27.3137C25.8261 29.5514 22.9751 31.0752 19.8714 31.6926C16.7678 32.3099 13.5506 31.993 10.627 30.7821C7.70345 29.571 5.20458 27.5203 3.44649 24.8891C1.68838 22.2579 0.75 19.1645 0.75 16H4.03768C6.64022 16 8.65236 18.2806 10.0982 20.4446C10.9773 21.7602 12.2267 22.7855 13.6886 23.391C15.1503 23.9966 16.7589 24.155 18.3107 23.8462C19.8626 23.5376 21.288 22.7757 22.4069 21.6569C23.5257 20.538 24.2876 19.1126 24.5962 17.5607C24.905 16.0089 24.7466 14.4003 24.141 12.9386C23.5355 11.4767 22.5102 10.2273 21.1946 9.34824Z"
                fill-rule="evenodd"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                clip-rule="evenodd"
                d="M9.75 3.03188e-06C9.19771 3.27109e-06 8.75643 0.449433 8.68758 0.997409C8.59863 1.70528 8.4152 2.39958 8.14104 3.06147C7.739 4.03207 7.14972 4.91399 6.40685 5.65686C5.66399 6.39973 4.78208 6.989 3.81147 7.39104C3.14957 7.6652 2.45527 7.84863 1.74741 7.93758C1.19943 8.00644 0.75 8.44772 0.75 9L0.75 16C2.85115 16 4.93172 15.5862 6.87294 14.7821C8.81416 13.978 10.578 12.7994 12.0637 11.3137C13.5494 9.828 14.728 8.06416 15.5321 6.12294C16.3362 4.18172 16.75 2.10115 16.75 0L9.75 3.03188e-06Z"
                fill-rule="evenodd"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >BriteMank</span
            >
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-950 before:from-surface-200 dark:before:from-surface-800 after:from-surface-200 dark:after:from-surface-800 relative flex items-center justify-center p-8 before:absolute before:right-0 before:bottom-0 before:hidden before:h-full before:w-px before:bg-gradient-to-b before:to-transparent after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-px after:bg-gradient-to-r after:to-transparent after:opacity-100 sm:pr-20 sm:before:hidden sm:after:block lg:pr-8 lg:before:block lg:after:opacity-0"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                clip-rule="evenodd"
                d="M16.75 32C25.5866 32 32.75 24.8366 32.75 16C32.75 7.16345 25.5866 0 16.75 0C7.91344 0 0.75 7.16345 0.75 16C0.75 24.8366 7.91344 32 16.75 32ZM21.7415 7.45348C21.9844 6.59044 21.1469 6.08011 20.382 6.62504L9.7045 14.2317C8.87498 14.8226 9.00546 16 9.9005 16H12.7122V15.9782H18.192L13.727 17.5537L11.7586 24.5466C11.5156 25.4096 12.3531 25.9199 13.118 25.375L23.7956 17.7684C24.6251 17.1774 24.4945 16 23.5996 16H19.3357L21.7415 7.45348Z"
                fill-rule="evenodd"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >ZenTrailMs</span
            >
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-950 before:from-surface-200 dark:before:from-surface-800 relative flex items-center justify-center p-8 before:absolute before:right-0 before:bottom-0 before:hidden before:h-full before:w-px before:bg-gradient-to-b before:to-transparent sm:pl-20 sm:before:block lg:pl-8"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M16.75 0C7.91344 0 0.75 7.16342 0.75 15.9999C9.58656 15.9999 16.75 8.83653 16.75 0Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M16.7496 32C25.5862 32 32.7496 24.8366 32.7496 16.0001C23.913 16.0001 16.7496 23.1635 16.7496 32Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M16.75 0C25.5866 0 32.7496 7.16353 32.7496 16.0001C23.913 16.0001 16.75 8.83653 16.75 0Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M16.7496 32C7.91304 32 0.749999 24.8365 0.75 15.9999C9.58656 15.9999 16.7496 23.1635 16.7496 32Z"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >Wavelength</span
            >
          </div>
        </div>
        <div
          class="bg-surface-0 dark:bg-surface-950 dark:before:from-transparen after:from--transparen dark:after:from--transparen relative flex items-center justify-center p-8 before:absolute before:right-0 before:bottom-0 before:hidden before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:to-transparent after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-px after:bg-gradient-to-r after:to-transparent after:opacity-100 sm:pr-20 sm:before:hidden sm:after:block lg:pr-8 lg:before:block lg:after:opacity-0"
        >
          <div class="relative flex items-center justify-center gap-3 px-5 py-3">
            <svg
              class="w-10"
              fill="none"
              height="32"
              viewBox="0 0 33 32"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M23.1273 17.7771C22.8566 18.9176 22.2851 19.9422 21.501 20.763L27.853 27.0935L30.1642 24.7901L23.1273 17.7771Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M21.437 20.8291C20.6435 21.6369 19.6406 22.2396 18.516 22.5503L20.8274 31.147L23.9845 30.3039L21.437 20.8291Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M20.8924 0.843083L17.7353 0L15.0748 9.8956L12.6728 0.961786L9.51555 1.80487L12.1108 11.4572L5.6467 5.01516L3.33549 7.3185L10.4258 14.3847L1.59596 12.0268L0.75 15.1732L10.3977 17.7495C10.2872 17.2747 10.2288 16.78 10.2288 16.2717C10.2288 12.6736 13.1555 9.7568 16.7659 9.7568C20.3762 9.7568 23.3029 12.6736 23.3029 16.2717C23.3029 16.7767 23.2452 17.2684 23.1361 17.7404L31.9041 20.0817L32.75 16.9353L23.064 14.3488L31.8944 11.9907L31.0484 8.84433L21.3628 11.4307L27.8268 4.98871L25.5156 2.68537L18.5237 9.65353L20.8924 0.843083Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M18.3956 22.582C17.8738 22.7156 17.3269 22.7867 16.7633 22.7867C16.1595 22.7867 15.5748 22.7051 15.0197 22.5524L12.7062 31.157L15.8634 32L18.3956 22.582Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M14.9108 22.5202C13.8033 22.1942 12.8183 21.5837 12.0409 20.7736L5.67331 27.1196L7.98451 29.4229L14.9108 22.5202Z"
              />
              <path
                class="fill-surface-500 dark:fill-surface-400"
                d="M11.9858 20.7177C11.2217 19.9025 10.6652 18.8916 10.4003 17.7687L1.60373 20.1178L2.44968 23.2641L11.9858 20.7177Z"
              />
            </svg>
            <span class="text-surface-500 dark:text-surface-400 text-xl leading-tight font-semibold"
              >AlphaHex</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-surface-50 dark:bg-surface-950 flex flex-col items-center justify-center gap-12 px-6 py-20 lg:px-20"
    >
      <div
        class="text-surface-900 dark:text-surface-0 text-center text-4xl leading-tight font-bold"
      >
        Featured Articles
      </div>

      <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <template v-for="(item, index) of blogs" :key="index">
          <div
            class="bg-surface-0 dark:bg-surface-900 flex flex-col gap-4 rounded-2xl p-2 shadow-sm"
          >
            <img
              :alt="item.title"
              class="aspect-[16/9] w-full rounded-lg object-cover"
              :src="item.cover"
            />
            <div class="flex flex-col gap-8 p-6">
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <span class="text-primary leading-tight font-medium">
                    {{ item.category }}
                  </span>
                  <div
                    class="text-surface-900 dark:text-surface-0 text-lg leading-normal font-medium"
                  >
                    {{ item.title }}
                  </div>
                </div>
                <div class="text-surface-700 dark:text-surface-200 text-base leading-normal">
                  {{ item.description }}
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Avatar
                  :alt="item.author.name"
                  class="!h-12 !w-12"
                  :image="item.author.image"
                  shape="circle"
                />
                <div class="flex flex-1 flex-col gap-2">
                  <div class="text-surface-900 dark:text-surface-0 leading-tight font-medium">
                    {{ item.author.name }}
                  </div>
                  <div class="text-surface-600 dark:text-surface-200 text-sm leading-tight">
                    {{ item.date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="bg-surface-0 dark:bg-surface-950 p-6 md:p-12 lg:p-20">
      <div class="flex flex-col items-center justify-center gap-12">
        <div class="flex flex-col items-center justify-center gap-6">
          <div class="flex flex-col items-center justify-center gap-4">
            <div
              class="text-primary-500 dark:text-primary-400 text-center text-xl leading-tight lg:text-2xl"
            >
              Save up to 25% today!
            </div>
            <div
              class="text-surface-900 dark:text-surface-0 text-center text-4xl leading-tight font-bold lg:text-5xl"
            >
              Pricing Plans
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <span
              :class="[
                { 'text-surface-500 dark:text-surface-400': checked },
                { 'text-surface-900 dark:text-surface-0 font-medium': !checked }
              ]"
              >Monthly</span
            >
            <ToggleSwitch v-model="checked" />
            <span
              :class="[
                { 'text-surface-500 dark:text-surface-400': !checked },
                { 'text-surface-900 dark:text-surface-0 font-medium': checked }
              ]"
              >Yearly</span
            >
          </div>
        </div>

        <div class="mx-auto mt-10 flex flex-col justify-center gap-10 lg:flex-row">
          <div
            class="bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-800 w-full max-w-[26rem] flex-1 rounded-2xl border"
          >
            <div
              class="border-surface-200 dark:border-surface-700 border-b px-6 pt-8 pb-4 text-center"
            >
              <div
                class="text-surface-900 dark:text-surface-0 mb-2 text-xl leading-tight font-medium"
              >
                Basic
              </div>
              <div class="flex items-center justify-center gap-2">
                <span
                  class="text-surface-900 dark:text-surface-0 text-4xl leading-tight font-semibold"
                  >{{ !checked ? "$10" : "$100" }}</span
                >
                <span class="text-surface-500 dark:text-surface-400 text-xl"
                  >/{{ checked ? "year" : "month" }}</span
                >
              </div>
            </div>
            <div class="flex flex-col gap-6 p-6">
              <span class="text-surface-600 dark:text-surface-400 text-lg leading-normal"
                >Subtitle of the plan maybe two lines even though lines of things.</span
              >
              <ul class="m-0 flex list-none flex-col gap-2 p-0">
                <li v-for="feature in features" :key="feature" class="flex items-center gap-2">
                  <span class="bg-surface-500 dark:bg-surface-400 h-2 w-2 rounded-full" />
                  <span class="text-surface-700 dark:text-surface-200">{{ feature }}</span>
                </li>
              </ul>
              <Button class="w-full" label="Buy Now" />
            </div>
          </div>

          <div
            class="bg-surface-900 dark:bg-surface-800 relative w-full max-w-[26rem] flex-1 rounded-2xl"
          >
            <div
              class="bg-primary text-primary-contrast absolute -top-4 left-1/2 -translate-x-1/2 rounded-3xl px-2 py-1 text-sm font-semibold"
            >
              MOST POPULAR
            </div>
            <div class="border-surface-700 border-b px-6 pt-8 pb-4 text-center">
              <div class="text-surface-0 mb-2 text-xl leading-tight font-medium">Premium</div>
              <div class="flex items-center justify-center gap-2">
                <span class="text-surface-0 text-4xl leading-tight font-semibold">{{
                  !checked ? "$20" : "$200"
                }}</span>
                <span class="text-surface-400 text-xl">/{{ checked ? "year" : "month" }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-6 p-6">
              <span class="text-surface-400 text-lg leading-normal"
                >Subtitle of the plan maybe two lines even though lines of things.</span
              >
              <ul class="m-0 flex list-none flex-col gap-2 p-0">
                <li v-for="feature in features" :key="feature" class="flex items-center gap-2">
                  <span class="bg-surface-400 h-2 w-2 rounded-full" />
                  <span class="text-surface-0">{{ feature }}</span>
                </li>
              </ul>
              <Button class="w-full" label="Buy Now" />
            </div>
          </div>

          <div class="bg-primary-800 dark:bg-primary-700 w-full max-w-[26rem] flex-1 rounded-2xl">
            <div
              class="border-primary-700/30 dark:border-primary-600 border-b px-6 pt-8 pb-4 text-center"
            >
              <div class="text-surface-0 mb-2 text-xl leading-tight font-medium">Enterprise</div>
              <div class="flex items-center justify-center gap-2">
                <span class="text-surface-0 text-4xl leading-tight font-semibold">{{
                  !checked ? "$900" : "$9000"
                }}</span>
                <span class="text-primary-200 text-xl">/{{ checked ? "year" : "month" }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-6 p-6">
              <span class="text-primary-200 text-lg leading-normal"
                >Subtitle of the plan maybe two lines even though lines of things.</span
              >
              <ul class="m-0 flex list-none flex-col gap-2 p-0">
                <li v-for="feature in features" :key="feature" class="flex items-center gap-2">
                  <span class="bg-primary-200 h-2 w-2 rounded-full" />
                  <span class="text-surface-0">{{ feature }}</span>
                </li>
              </ul>
              <Button class="w-full" label="Contact Us" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <div
        class="bg-surface-50 dark:bg-surface-900 border-surface-200 dark:border-surface-800 rounded-2xl border p-14"
      >
        <div class="grid h-full grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div class="flex h-full flex-1 flex-col gap-12 lg:max-w-lg">
            <div class="flex flex-1 flex-col gap-6">
              <h2 class="text-surface-900 dark:text-surface-0 text-5xl leading-tight font-bold">
                Are you ready to get in touch with us?
              </h2>
              <p class="text-surface-600 dark:text-surface-400 text-xl leading-normal">
                Are you interested in Mistranet helping with your project? Get in touch beside and
                we will get back to you soon to schedule a discovery call.
              </p>
            </div>
            <div class="mt-auto flex flex-col gap-4">
              <div class="text-surface-900 dark:text-surface-0 text-xl leading-normal">
                hi@mistranet.com
              </div>
              <div class="flex items-center gap-4">
                <a
                  class="bg-surface-0 dark:bg-surface-900 hover:bg-surface-100 dark:hover:bg-surface-800 border-surface-200 dark:border-surface-700 flex h-12 w-12 items-center justify-center rounded-full border"
                  href="#"
                >
                  <i
                    class="pi pi-discord text-surface-900 dark:text-surface-0 !text-xl !leading-none"
                  />
                </a>
                <a
                  class="bg-surface-0 dark:bg-surface-900 hover:bg-surface-100 dark:hover:bg-surface-800 border-surface-200 dark:border-surface-700 flex h-12 w-12 items-center justify-center rounded-full border"
                  href="#"
                >
                  <i
                    class="pi pi-twitter text-surface-900 dark:text-surface-0 !text-xl !leading-none"
                  />
                </a>
                <a
                  class="bg-surface-0 dark:bg-surface-900 hover:bg-surface-100 dark:hover:bg-surface-800 border-surface-200 dark:border-surface-700 flex h-12 w-12 items-center justify-center rounded-full border"
                  href="#"
                >
                  <i
                    class="pi pi-youtube text-surface-900 dark:text-surface-0 !text-xl !leading-none"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="flex h-full flex-1 flex-col gap-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputText
                placeholder="First Name"
                :pt="{
                  root: {
                    class:
                      'px-3 py-2 text-sm shadow-sm rounded-md border-surface-200 dark:border-surface-700'
                  }
                }"
                type="text"
                :value="contact.name"
              />
              <InputText
                placeholder="Company"
                :pt="{
                  root: {
                    class:
                      'px-3 py-2 text-sm shadow-sm rounded-md border-surface-200 dark:border-surface-700'
                  }
                }"
                type="text"
                :value="contact.company"
              />
              <InputText
                placeholder="Email"
                :pt="{
                  root: {
                    class:
                      'px-3 py-2 text-sm shadow-sm rounded-md border-surface-200 dark:border-surface-700'
                  }
                }"
                type="text"
                :value="contact.email"
              />
              <InputText
                placeholder="Budget"
                :pt="{
                  root: {
                    class:
                      'px-3 py-2 text-sm shadow-sm rounded-md border-surface-200 dark:border-surface-700'
                  }
                }"
                type="text"
                :value="contact.budget"
              />
            </div>
            <Textarea
              placeholder="Message"
              :pt="{
                root: {
                  class:
                    'px-3 py-2 text-sm shadow-sm rounded-md border-surface-200 dark:border-surface-700'
                }
              }"
              rows="8"
              :value="contact.message"
            />
            <Button
              label="Submit"
              :pt="{
                root: {
                  class:
                    '!px-3 !py-2 !text-sm !font-medium !bg-primary !border-primary hover:!bg-primary-600 hover:!border-primary-600'
                }
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-surface-900 px-6 py-20 md:px-12 lg:px-20">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-4">
            <svg
              fill="none"
              height="32"
              viewBox="0 0 42 42"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-surface-0"
                d="M21 0C9.40201 0 0 9.40201 0 21C11.598 21 21 11.598 21 0Z"
              />
              <path
                class="fill-surface-0"
                d="M21 42C32.598 42 42 32.598 42 21C30.402 21 21 30.402 21 42Z"
              />
              <path
                class="fill-surface-0"
                d="M21 0C32.598 0 42 9.40201 42 21C30.402 21 21 11.598 21 0Z"
              />
              <path
                class="fill-surface-0"
                d="M21 42C9.40201 42 -1.01393e-06 32.598 0 21C11.598 21 21 30.402 21 42Z"
              />
            </svg>
            <span class="text-surface-0 text-lg leading-tight font-semibold">AlphaHex</span>
          </div>
        </div>
        <div>
          <div class="text-surface-0 mb-5 leading-tight font-bold">Company</div>
          <div class="flex flex-col gap-4">
            <a
              v-for="item in ['About Us', 'News', 'Investor Relations', 'Careers', 'Media Kit']"
              :key="item"
              class="text-surface-200 hover:text-surface-0 cursor-pointer leading-tight transition-colors"
            >
              {{ item }}
            </a>
          </div>
        </div>
        <div>
          <div class="text-surface-0 mb-5 leading-tight font-bold">Resources</div>
          <div class="flex flex-col gap-4">
            <a
              v-for="item in ['Get Started', 'Learn', 'Case Studies']"
              :key="item"
              class="text-surface-200 hover:text-surface-0 cursor-pointer leading-tight transition-colors"
            >
              {{ item }}
            </a>
          </div>
        </div>
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex flex-col gap-2">
            <div class="text-surface-0 leading-normal">
              Jacob Obrechtstraat 5, 1071 KC Amsterdam The Netherlands
            </div>
            <div class="text-surface-0 leading-tight">(31) 20 779 8986</div>
            <div class="text-surface-0 leading-tight">hello@bastion.co</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": "BlankLayout"
  }
}
</route>
