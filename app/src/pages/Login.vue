<template>
    <v-app id="inspire" class=green>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4 class="text-md-center px-2">
                    <v-card class="mt-3">
                        <v-card-text>
                            <v-form ref="form-login" @keyup.native.enter="login">
                                <v-text-field
                                    prepend-icon="alternate_email"
                                    v-model="email"
                                    label="E-mail"
                                    type="email"
                                    required
                                    :error-messages="emailErrors"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="lock"
                                    v-model="password"
                                    label="Senha"
                                    type="password"
                                    required
                                    :error-messages="passwordErrors"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="login" color="green white--text" :loading="loading">Entrar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, email } from 'vuelidate/lib/validators';
    import AuthService from '@/services/AuthService';

    export default {
        mixins: [validationMixin],
        validations: {
            email: { required, email },
            password: { required },
        },
        data: () => ({
            email: '',
            password: '',
            loading: false,
        }),
        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.required && errors.push('E-mail é obrigatório.');
                !this.$v.email.email && errors.push('E-mail deve ser um e-mail válido.');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Senha é obrigatório.');
                return errors;
            },
        },
        methods: {
            login() {
                this.$v.$touch();
                if (! this.$v.$invalid) {
                    this.loading = true;
                    AuthService
                        .login({email: this.email, password: this.password})
                        .then(() => {
                            this.loading = false;
                            this.$router.push({name: 'Users'});
                        })
                        .catch(() => this.loading = false);
                }
            }
        },
    }
</script>
