<template>
    <v-container class="pt-0">
        <form class="mt-2">
            <v-layout>
                <v-flex xs12 md5 mr-2>
                    <v-text-field
                            v-model="user.name"
                            label="Nome"
                            :counter="35"
                            required
                            :error-messages="nameErrors"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md6 mr-2>
                    <v-text-field
                            v-model="user.email"
                            label="E-mail"
                            :counter="35"
                            required
                            :error-messages="emailErrors"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md1 mr-2>
                    <v-text-field
                            v-model="user.age"
                            type="number"
                            label="Idade"
                            required
                            :error-messages="ageErrors"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12 md2 mr-2>
                    <v-text-field
                            v-model="cep"
                            label="CEP"
                            :counter="8"
                            type="number"
                            required
                            :error-messages="cepErrors"
                            @blur="getAddress"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md6 mr-2>
                    <v-text-field
                            v-model="user.address.street"
                            label="Logradouro"
                            :counter="120"
                            required
                            :error-messages="streetErrors"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md1 mr-2>
                    <v-text-field
                            v-model="user.address.number"
                            label="Nº"
                            required
                            :error-messages="numberErrors"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 mr-2>
                    <v-text-field
                            v-model="user.address.comp"
                            label="Complemento"
                            :counter="20"
                            :error-messages="compErrors"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-btn class="right" @click="submit" color="green" dark :loading="disableButton">Salvar</v-btn>
        </form>
    </v-container>
</template>
<script>
    import { validationMixin } from 'vuelidate';
    import { required, maxLength, email, numeric } from 'vuelidate/lib/validators';
    import ViaCepService from '@/services/ViaCepService.js';

    export default {
        mixins: [validationMixin],
        props: {
            user: Object,
            isEdit: Boolean,
        },
        validations: {
            user: {
                name: { required, maxLength: maxLength(35) },
                email: { required, email, maxLength: maxLength(35) },
                age: { required, numeric },
                address: {
                    street: { required, maxLength: maxLength(120)},
                    number: { required },
                    comp: { maxLength: maxLength(20) },
                },
            },
            cep: { required, maxLength: maxLength(8), numeric },
        },
        data: () => ({
            disableButton: false,
            cep: '',
        }),
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.user.name.$dirty) return errors;
                !this.$v.user.name.maxLength && errors.push('Nome pode ter no maximo 35 caracteres.');
                !this.$v.user.name.required && errors.push('Nome é obrigatório.');
                return errors;
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.user.email.$dirty) return errors;
                !this.$v.user.email.maxLength && errors.push('E-mail pode ter no maximo 35 caracteres.');
                !this.$v.user.email.required && errors.push('E-mail é obrigatório.');
                !this.$v.user.email.email && errors.push('E-mail deve ser um e-mail válido.')
                return errors;
            },
            ageErrors() {
                const errors = [];
                if (!this.$v.user.age.$dirty) return errors;
                !this.$v.user.age.required && errors.push('Idade é obrigatório.');
                !this.$v.user.age.numeric && errors.push('Idade deve ser do tipo numérico.');
                return errors;
            },
            cepErrors() {
                const errors = [];
                if (!this.$v.cep.$dirty) return errors;
                !this.$v.cep.required && errors.push('CEP é obrigatório.');
                !this.$v.cep.numeric && errors.push('CEP deve ser do tipo numérico.');
                !this.$v.cep.maxLength && errors.push('CEP pode ter no maximo 8 caracteres.');
                return errors;
            },
            streetErrors() {
                const errors = [];
                if (!this.$v.user.address.street.$dirty) return errors;
                !this.$v.user.address.street.required && errors.push('Logradouro é obrigatório.');
                !this.$v.user.address.street.maxLength && errors.push('Logradouro pode ter no maximo 120 caracteres.');
                return errors;
            },
            numberErrors() {
                const errors = [];
                if (!this.$v.user.address.number.$dirty) return errors;
                !this.$v.user.address.number.required && errors.push('Número é obrigatório.');
                return errors;
            },
            compErrors() {
                const errors = [];
                if (!this.$v.user.address.comp.$dirty) return errors;
                !this.$v.user.address.comp.maxLength && errors.push('Complemento pode ter no maximo 20 caracteres.');
                return errors;
            },
        },
        methods: {
            submit () {
                this.$v.$touch();
                if (! this.$v.$invalid) {
                    this.disableButton = true;
                    this.sendData();
                }
            },
            sendData () {
                this.isEdit ? this.editUser() : this.createUser();
            },
            createUser() {
                this.disableButton = false
            },
            editUser() {
                this.disableButton = false
            },
            getAddress() {
                console.log(this.cep);
                ViaCepService
                    .address(this.cep)
                    .then(response => {
                        const address = response.data;
                        this.user.address = {
                            street: address.logradouro,
                            comp: address.complemento,
                        }
                    })
            },
        },
    }
</script>
