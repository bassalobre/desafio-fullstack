<template>
    <v-container class="pt-0">
        <v-card>
            <v-card-text>
                <v-form class="mt-2" ref="form-user" @keyup.native.enter="submit">
                    <v-layout>
                        <v-flex xs12 md5 mr-2>
                            <v-text-field
                                    v-model="user.name"
                                    label="Nome *"
                                    :counter="35"
                                    required
                                    :error-messages="nameErrors"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md5 mr-2>
                            <v-text-field
                                    v-model="user.email"
                                    label="E-mail *"
                                    :counter="35"
                                    required
                                    :error-messages="emailErrors"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md2>
                            <v-text-field
                                    v-model="user.birthDate"
                                    type="date"
                                    label="Data de Nascimento *"
                                    required
                                    :error-messages="birthDateErrors"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 md2 mr-2>
                            <v-text-field
                                    v-model="cep"
                                    label="CEP *"
                                    :counter="8"
                                    type="number"
                                    required
                                    :error-messages="cepErrors"
                                    @blur="getAddress"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 mr-2>
                            <v-text-field
                                    v-model="user.address.city"
                                    label="Cidade *"
                                    :counter="60"
                                    required
                                    :error-messages="cityErrors"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md1 mr-2>
                            <v-text-field
                                    v-model="user.address.state"
                                    label="UF *"
                                    :counter="2"
                                    required
                                    :error-messages="stateErrors"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md5>
                            <v-text-field
                                    v-model="user.address.neighborhood"
                                    label="Bairro *"
                                    :counter="120"
                                    required
                                    :error-messages="neighborhoodErrors"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 md7 mr-2>
                            <v-text-field
                                    v-model="user.address.street"
                                    label="Logradouro *"
                                    :counter="120"
                                    required
                                    :error-messages="streetErrors"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md1 mr-2>
                            <v-text-field
                                    v-model="user.address.number"
                                    label="Nº *"
                                    required
                                    :error-messages="numberErrors"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                    v-model="user.address.comp"
                                    label="Complemento"
                                    :counter="20"
                                    :error-messages="compErrors"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 md6 mr-2>
                            <v-text-field
                                    v-model="user.fatherName"
                                    label="Nome do Pai"
                                    :counter="35"
                                    :error-messages="fatherNameErrors"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field
                                    v-model="user.motherName"
                                    label="Nome da Mãe"
                                    :counter="35"
                                    :error-messages="motherNameErrors"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
                <span>* Campos obrigatórios</span>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="green" dark :loading="disableButton">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
    import { validationMixin } from 'vuelidate';
    import { required, minLength, maxLength, email, numeric } from 'vuelidate/lib/validators';
    import ViaCepService from '@/services/ViaCepService';

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
                birthDate: { required },
                address: {
                    city: { required, maxLength: maxLength(60) },
                    state: { required, maxLength: maxLength(2) },
                    neighborhood: { required, maxLength: maxLength(120) },
                    street: { required, maxLength: maxLength(120)},
                    number: { required },
                    comp: { maxLength: maxLength(20) },
                },
                fatherName: { maxLength: maxLength(35) },
                motherName: { maxLength: maxLength(35) },
            },
            cep: { required, maxLength: maxLength(8), minLength: minLength(8), numeric },
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
            birthDateErrors() {
                const errors = [];
                if (!this.$v.user.birthDate.$dirty) return errors;
                !this.$v.user.birthDate.required && errors.push('Idade é obrigatório.');
                return errors;
            },
            cepErrors() {
                const errors = [];
                if (!this.$v.cep.$dirty) return errors;
                !this.$v.cep.required && errors.push('CEP é obrigatório.');
                !this.$v.cep.numeric && errors.push('CEP deve ser do tipo numérico.');
                !this.$v.cep.maxLength && errors.push('CEP deve ter no maximo 8 caracteres.');
                !this.$v.cep.minLength && errors.push('CEP deve ter no mínimo 8 caracteres.');
                return errors;
            },
            cityErrors() {
                const errors = [];
                if (!this.$v.user.address.city.$dirty) return errors;
                !this.$v.user.address.city.required && errors.push('Cidade é obrigatório.');
                !this.$v.user.address.city.maxLength && errors.push('Cidade pode ter no maximo 60 caracteres.');
                return errors;
            },
            stateErrors() {
                const errors = [];
                if (!this.$v.user.address.state.$dirty) return errors;
                !this.$v.user.address.state.required && errors.push('UF é obrigatório.');
                !this.$v.user.address.state.maxLength && errors.push('UF pode ter no maximo 2 caracteres.');
                return errors;
            },
            neighborhoodErrors() {
                const errors = [];
                if (!this.$v.user.address.neighborhood.$dirty) return errors;
                !this.$v.user.address.neighborhood.required && errors.push('Bairro é obrigatório.');
                !this.$v.user.address.neighborhood.maxLength && errors.push('Bairro pode ter no maximo 120 caracteres.');
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
            fatherNameErrors() {
                const errors = [];
                if (!this.$v.user.fatherName.$dirty) return errors;
                !this.$v.user.fatherName.maxLength && errors.push('Nome do Pai pode ter no maximo 35 caracteres.');
                return errors;
            },
            motherNameErrors() {
                const errors = [];
                if (!this.$v.user.motherName.$dirty) return errors;
                !this.$v.user.motherName.maxLength && errors.push('Nome da Mãe pode ter no maximo 35 caracteres.');
                return errors;
            },
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (! this.$v.$invalid) {
                    this.disableButton = true;
                    this.sendData();
                }
            },
            sendData() {
                this.isEdit ? this.editUser() : this.createUser();
            },
            createUser() {
                this.disableButton = false
            },
            editUser() {
                this.disableButton = false
            },
            getAddress() {
                this.$v.$touch();
                if (this.cepErrors.length === 0) {
                    ViaCepService
                        .addressByCep(this.cep)
                        .then(response => {
                            this.setAddress(response.data);
                        })
                }
            },
            setAddress(address) {
                this.user.address.cep = address.cep;
                this.user.address.city = address.localidade;
                this.user.address.state = address.uf;
                this.user.address.neighborhood = address.bairro;
                this.user.address.street = address.logradouro;
                this.user.address.comp = address.complemento;
            },
        },
        watch: {
            'user.address.cep'(newValue) {
                this.cep = newValue.toString().replace('-', '');
            },
        },
    }
</script>
