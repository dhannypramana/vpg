<script lang="ts" setup>
defineOptions({
    name: 'Default',
});
</script>

<template>
    <section class="h-dvh overflow-auto flex flex-col justify-between">
        <main class="grow">
            <RouterView />
        </main>
    </section>
</template>
