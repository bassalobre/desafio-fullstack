<template>
    <v-container class="pt-0">
        <v-btn color="green white--text" class="right" @click="create()">Cadastrar Usuário</v-btn>
        <v-data-table
            :headers="headers"
            :items="users"
            :rows-per-page-items="rowsPerPage"
            class="elevation-1"
            item-key="id"
            rows-per-page-text="Itens por página"
            :pagination.sync="pagination"
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.birthDate | dateFilter }}</td>
                <td class="text-xs-left">{{ props.item.address.cep | cepFilter }}</td>

                <td class="text-xs-left">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                    v-on="on"
                                    small
                                    class="mr-2"
                                    @click="edit(props.item)"
                            >
                                edit
                            </v-icon>
                        </template>
                        <span>Editar</span>
                    </v-tooltip>
                </td>
                <td class="text-xs-left">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-icon
                                    v-on="on"
                                    small
                                    class="mr-2"
                                    @click="destroy(props.item, props.index)"
                            >
                                delete_forever
                            </v-icon>
                        </template>
                        <span>Excluir</span>
                    </v-tooltip>
                </td>
            </template>
            <template slot="pageText" slot-scope="props">
                {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
            </template>
            <template slot="no-data">
                <div class="text-xs-center">
                    Nenhum usuário encontrado.
                </div>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import moment from 'moment';
import UserService from '@/services/UserService';

export default {
    props: {
        users: Array,
    },
    data: () => ({
        rowsPerPage: [25,50,100],
        pagination: {
            sortBy: 'updated_at',
            descending: true,
        },
        headers: [
            { width: 500, align: 'left', text: 'Nome', value: 'name' },
            { width: 500, align: 'left', text: 'E-mail', value: 'email' },
            { width: 100, align: 'left', text: 'Data de Nascimento', value: 'birthDate' },
            { width: 250, align: 'left', text: 'CEP', value: 'address.cep' },
            { width: 50, align: 'left', text: '', value: 'id' },
            { width: 50, align: 'left', text: '', value: 'id' },
        ],
    }),
    filters: {
        cepFilter(value) {
            return value.toString().replace(/^(\d{5})(\d{3}).*/,"$1-$2");
        },
        dateFilter(value) {
            return moment(value).format('DD/MM/Y');
        },
    },
    methods: {
        create() {
            this.$router.push({name: 'CreateUser'});
        },
        edit(item) {
            this.$router.push({name: 'EditUser', params: { id: item.id}});
        },
        destroy(item, index) {
            this
                .$confirm('Tem certeza que deseja excluir este Usuário?')
                .then(res => {
                    if (!res) return;

                    const userService = new UserService();
                    userService
                        .destroyUser(item.id)
                        .then(() => {
                            this.users.splice(index, 1);
                        });
                })
        },
    },
}
</script>