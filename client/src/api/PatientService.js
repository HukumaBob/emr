import axios from 'axios';

const API_URL = 'patient/'; // Замените на реальный URL вашего API

class PatientService {
  // Получение списка пациентов
  static async getPatients() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка пациентов:', error);
      throw error;
    }
  }

  // Создание нового пациента
  static async createPatient(patientData) {
    try {
      const response = await axios.post(`${API_URL}`, patientData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании пациента:', error);
      throw error;
    }
  }

  // Обновление информации о пациенте
  static async updatePatient(patientId, patientData) {
    try {
      const response = await axios.put(`${API_URL}/${patientId}`, patientData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении информации о пациенте:', error);
      throw error;
    }
  }

  // Удаление пациента
  static async deletePatient(patientId) {
    try {
      await axios.delete(`${API_URL}/${patientId}`);
      console.log('Пациент успешно удален');
    } catch (error) {
      console.error('Ошибка при удалении пациента:', error);
      throw error;
    }
  }
}

export default PatientService;
