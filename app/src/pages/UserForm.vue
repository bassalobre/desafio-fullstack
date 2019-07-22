<template>
    <div class="flex">
        <app-form :user="user" :isEdit="isEdit"></app-form>
    </div>
</template>

<script>
    import Form from '@/components/Form';
    import ApiService from '@/services/ApiService.js';

    export default {
        components: {
            'app-form': Form,
        },
        data: () => ({
            user: {
                address: {},
            },
            isEdit: false,
        }),
        mounted() {
            const id = this.$route.params.id;

            if (id) {
                this.getUser(id);
            }
        },
        methods: {
            getUser(id) {
                this.isEdit = true;
                ApiService
                    .user(id)
                    .then((response) => {
                        this.user = response.data;
                    });
            },
        },
    }
</script>
