<script setup lang="ts">
defineOptions({
    name: 'Layout',
});

const route = useRoute();
const currentLayout = shallowRef<string>('div');

watch(
    () => route.meta,
    (value) => {
        const { layout = 'Default' } = value as { layout?: string };
        currentLayout.value = route.name !== 'catchAll' ? layout : 'Default';
    },
);
</script>

<template>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>
