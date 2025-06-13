import { keposApi } from '../libs/keposApi';

// filepath: c:/Users/Voltage/Documents/Projetos/Kepos/kepos-mobile/kepos-wind/src/service/moduleService.js

// Consulta todos os módulos
export async function getAllModules() {
    try {
        const response = await keposApi.get('/modulo');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Erro ao buscar módulos');
    }
}

// Consulta módulos por dendro_id
export async function getModulesByDendroId(dendro_id) {
    try {
        const response = await keposApi.get('/modulo', { params: { dendro_id } });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Erro ao buscar módulos por dendro');
    }
}

// Consulta módulo por ID
export async function getModuleById(id) {
    try {
        const response = await keposApi.get(`/modulo/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Erro ao buscar módulo por ID');
    }
}

// Cadastra um novo módulo
export async function createModule(moduleDTO) {
    try {
        const response = await keposApi.post('/modulo', moduleDTO);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Erro ao cadastrar módulo');
    }
}

// Atualiza um módulo
export async function updateModule(id, moduleDTO) {
    try {
        const response = await keposApi.patch(`/modulo/${id}`, moduleDTO);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Erro ao atualizar módulo');
    }
}

// Deleta um módulo
export async function deleteModule(id) {
    try {
        const response = await keposApi.delete(`/modulo/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Erro ao deletar módulo');
    }
}