export const usePageStore = () => {
    const title = shallowRef<string>('');
    const breadcrumbs = shallowRef<Array<string>>([]);

    return {
        title,
        breadcrumbs,
    };
};
