import { keposApi } from '../libs/keposApi';

// Obtém o usuário logado
export async function getLoggedUser() {
    try {
        const response = await keposApi.get('/usuario');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter usuário logado:', error);
        throw error;
    }
}

// Obtém todos os usuários (admin)
export async function getAllUsers() {
    try {
        const response = await keposApi.get('/usuario/todos');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter todos os usuários:', error);
        throw error;
    }
}

// Cadastra um novo usuário
export async function registerUser(userData) {
    try {
        const response = await keposApi.post('/usuario', userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        console.error('Erro ao cadastrar usuário:', error.response.data.message);
        throw error;
    }
}

// Realiza login e retorna o token JWT
export async function loginUser(loginData) {
    try {
        const response = await keposApi.post('/usuario/login', loginData);
        return response.data;
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        console.error('Erro ao realizar login:', error.response.data.message);
        throw error;
    }
}

// Atualiza dados do usuário logado
export async function updateUser(userData) {
    try {
        const response = await keposApi.put('/usuario', userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}

// Deleta o usuário logado
export async function deleteUser() {
    try {
        const response = await keposApi.delete('/usuario');
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}