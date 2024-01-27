<main class="flex w-screen h-screen bg-gray-100 p-8">
  <div class="card card-side bg-base-100 shadow-lg px-4 py-4 w-full">
    <!-- Left side -->
    <slot name="left" />
    <div class="divider divider-horizontal"></div>

    <!-- Right side -->
    <div class="w-full flex flex-col flex-1">
      <slot name="right" />
      <div class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</main>
