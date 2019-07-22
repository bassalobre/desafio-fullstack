<template>
    <v-container class="pt-0">
        <v-btn color="info right" @click="create()">Cadastrar Usuário</v-btn>
        <v-data-table
            :headers="headers"
            :items="users"
            :rows-per-page-items="rowsPerPage"
            class="elevation-1"
            item-key="created_at"
            rows-per-page-text="Itens por página"
            :pagination.sync="pagination"
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.age }}</td>
                <td class="text-xs-left">{{ props.item.cep }}</td>

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
                                    @click="delete(props.item)"
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
            { width: 100, align: 'left', text: 'Idade', value: 'age' },
            { width: 250, align: 'left', text: 'CEP', value: 'cep' },
            { width: 50, align: 'left', text: '', value: 'id' },
            { width: 50, align: 'left', text: '', value: 'id' },
        ],
    }),
    methods: {
        create() {
            this.$router.push({name: 'CreateUser'});
        },
        edit(item) {
            this.$router.push({name: 'EditUser', params: { id: item.id}});
        },
        delete(item) {
            console.log(item);
        },
    },
}
</script>