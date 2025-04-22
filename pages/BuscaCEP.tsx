import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"; 

export default function BuscaCEP() {
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState({
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
        estado: "",
        regiao: "",

    });

    async function buscarCEP() {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        setEndereco({
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
            estado: data.estado,
            regiao: data.regiao,
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Buscador de endereços via CEP</Text>
            <TextInput value={cep} onChangeText={setCep} style={styles.textinput} />
            <Button title="buscar" onPress={buscarCEP} />
            <Text style={styles.text}>{cep}</Text>
            {endereco.logradouro && <Text style={styles.text}>{endereco.logradouro}</Text>}
            {endereco.bairro && <Text style={styles.text}>{endereco.bairro}</Text>}
            {endereco.localidade && <Text style={styles.text}>{endereco.localidade}</Text>}
            {endereco.uf && <Text style={styles.text}>{endereco.uf}</Text>}
            {endereco.estado && <Text style={styles.text}>{endereco.estado}</Text>}
            {endereco.regiao && <Text style={styles.text}>{endereco.regiao}</Text>}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    textinput: {
        borderWidth: 1,
        color: "red",
        width: "30%",
        padding: 10,
        margin: 10,
    },
    text: {
        margin: 10,
        fontSize: 17,
    }
});