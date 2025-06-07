import { keposApi } from '../libs/keposApi';

// Consulta todas as dendros
export async function getAllDendros() {
    try {
        const response = await keposApi.get('/dendro');
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao buscar dendros');
    }
}

// Consulta dendros por nome
export async function getDendrosByName(nome) {
    try {
        const response = await keposApi.get('/dendro', { params: { nome } });
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao buscar dendros por nome');
    }
}

// Consulta todas as dendros do usuário autenticado
export async function getUserDendros() {
    try {
        const response = await keposApi.get('/dendro/usuario');
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao buscar dendros do usuário');
    }
}

// Consulta dendro por ID
export async function getDendroById(id) {
    try {
        const response = await keposApi.get(`/dendro/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao buscar dendro por ID');
    }
}

// Cadastra uma nova dendro
export async function createDendro(dendroDTO) {
    try {
        const response = await keposApi.post('/dendro', dendroDTO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao cadastrar dendro');
    }
}

// Adiciona usuário à dendro
export async function addUserToDendro(dendroDTO) {
    try {
        const response = await keposApi.patch('/dendro/usuario', dendroDTO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao adicionar usuário à dendro');
    }
}

// Desassocia usuário da dendro
export async function removeUserFromDendro(dendroDTO) {
    try {
        const response = await keposApi.patch('/dendro/usuario/desassociar', dendroDTO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao remover usuário da dendro');
    }
}

// Atualiza uma dendro
export async function updateDendro(id, dendroDTO) {
    try {
        const response = await keposApi.patch(`/dendro/${id}`, dendroDTO);
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao atualizar dendro');
    }
}

// Deleta uma dendro
export async function deleteDendro(id) {
    try {
        const response = await keposApi.delete(`/dendro/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        throw new Error(error.response?.data?.message || 'Erro ao deletar dendro');
    }
}