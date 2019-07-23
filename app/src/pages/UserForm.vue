<template>
    <div class="flex">
        <app-form :user="user" :isEdit="isEdit"></app-form>
    </div>
</template>

<script>
    import Form from '@/components/Form';
    import UserService from '@/services/UserService';

    export default {
        components: {
            'app-form': Form,
        },
        data: () => ({
            user: {
                name: '',
                email: '',
                birthDate: null,
                address: {
                    cep: null,
                    city: '',
                    state: '',
                    neighborhood: '',
                    street: '',
                    number: '',
                    comp: '',
                },
                fatherName: '',
                motherName: '',
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
                UserService
                    .userById(id)
                    .then((response) => {
                        this.user = response.data;
                    });
            },
        },
    }
</script>
