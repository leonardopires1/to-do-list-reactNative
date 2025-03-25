import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _tarefa } from './types/_tarefa';
import Tarefa from './components/tarefa';

export default function App() {
  const [texto, setTexto] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);

  // Carregar tarefas do AsyncStorage ao iniciar o app
  useEffect(() => {
    async function carregarTarefas() {
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
    }
    carregarTarefas();
  }, []);

  // Salvar tarefas no AsyncStorage
  async function salvarTarefas(novasTarefas: _tarefa[]) {
    await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  }

  function adicionarTarefa() {
    if (texto === '') {
      alert('Digite o texto da tarefa!');
      return;
    }

    let tarefa: _tarefa = {
      id: tarefas.length + 1,
      texto
    };

    const novasTarefas = [...tarefas, tarefa];
    setTarefas(novasTarefas);
    salvarTarefas(novasTarefas); // Salvar no AsyncStorage
    setTexto(''); // Limpar o campo de texto
  }

  function excluirTarefa(id: number) {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
    salvarTarefas(novasTarefas); // Atualizar no AsyncStorage
  }

  function mostrarTarefas() {
    return tarefas.map((tarefa) => (
      <Tarefa key={tarefa.id} dados={tarefa} handleDeletePress={excluirTarefa} />
    ));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={texto}
        placeholder="Digite o título da sua tarefa: "
        onChangeText={setTexto}
      />
      <Button title="Adicionar tarefa" color={'#123456'} onPress={adicionarTarefa} />
      {mostrarTarefas()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#123456',
    margin: 10,
    padding: 10,
    width: 250,
  },

  button: {
    color: '#123456',
    padding: 10,
    margin: 10,
  },
});