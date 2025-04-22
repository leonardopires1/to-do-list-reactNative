import { Button, Text, View, StyleSheet } from "react-native";
import { _tarefa } from "../types/_tarefa";

interface tarefaProps {
    dados: _tarefa;
    handleDeletePress: (id: number) => void;
    key: number;
}

export default function Tarefa (props: tarefaProps) {
    const styles = StyleSheet.create({
        texto: {
            fontSize: 18,
            color: '#123456',
        },

        tarefaContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#123456',
            borderBottomWidth: 1,
            padding: 10,
            margin: 10,
            borderRadius: 3,
            gap: 10,
        }
    });

    return (
        <View style={styles.tarefaContainer}>
            <Text style={styles.texto}>{props.dados.texto}</Text>
            <Button title="Excluir" color={'red'} onPress={() => props.handleDeletePress(props.dados.id)}/>
        </View>
    )
}