<script setup lang="ts">
const teamMembers = [
  {
    name: "Jane Cooper",
    role: "Product Designer",
    image:
      "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/team/team-12.png",
    bio: "Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.",
    socials: ["twitter", "github", "facebook"]
  },
  {
    name: "Helena Larsen",
    role: "Product Manager",
    image:
      "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/team/team-10.png",
    bio: "Velit dignissim sodales ut eu sem integer vitae justo eget. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Tellus cras adipiscing enim eu turpis egestas pretium aenean.",
    socials: ["twitter", "github", "facebook"]
  },
  {
    name: "Aleena Jones",
    role: "Product Designer",
    image:
      "https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/team/team-16.png",
    bio: "Porttitor leo a diam sollicitudin tempor. Diam ut venenatis tellus in metus vulputate eu scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis.",
    socials: ["twitter", "github", "facebook"]
  }
];
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-950 flex flex-col items-start gap-28 px-6 py-20 md:px-12 lg:px-20 xl:flex-row"
  >
    <div class="flex flex-1 flex-col justify-center gap-8">
      <div class="flex flex-col justify-center gap-4">
        <h4 class="text-surface-900 dark:text-surface-0 text-4xl leading-tight font-bold">
          Meet our team
        </h4>
        <p class="text-surface-600 dark:text-surface-300 text-xl leading-normal">
          Viverra orci sagittis eu volutpat. Proin fermentum leo vel orci porta non. Facilisis
          gravida neque convallis a cras semper auctor. Odio eu feugiat pretium nibh ipsum
          consequat. In hac habitasse platea dictumst quisque.
        </p>
      </div>
      <Button class="w-fit" icon="pi pi-arrow-right" icon-pos="right" label="All Team" rounded />
    </div>

    <div class="flex flex-1 flex-col gap-14">
      <div v-for="member in teamMembers" :key="member.name" class="flex flex-col gap-4">
        <div class="flex items-center gap-6">
          <img :alt="member.name" class="h-14 w-14 rounded-full object-cover" :src="member.image" />
          <div class="flex flex-1 flex-col gap-2">
            <h3 class="text-surface-900 dark:text-surface-0 text-xl leading-tight font-semibold">
              {{ member.name }}
            </h3>
            <span class="text-surface-600 dark:text-surface-300 leading-tight">{{
              member.role
            }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-6 pl-[4.8125rem]">
          <p class="text-surface-500 dark:text-surface-400 text-base leading-normal">
            {{ member.bio }}
          </p>
          <div class="flex items-start gap-2">
            <a
              v-for="icon in member.socials"
              :key="icon"
              class="border-surface-200 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800 flex items-start rounded-[1.125rem] border px-4 py-2"
              href="#"
            >
              <i
                :class="`pi pi-${icon} text-surface-900 dark:text-surface-400 !text-xl !leading-none`"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
