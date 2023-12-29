import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";


export function NewGroup() {
  const [groupName, setGroupName] = useState('')
  const navigator = useNavigation()

  async function handleCreateNewGroup() {
    try {

      if(groupName.trim().length === 0) {
        return Alert.alert("Novo grupo", "Informe o nome do grupo para cadastrar.")
      }

      await groupCreate(groupName)
      navigator.navigate('players', {group: groupName})
    } catch(error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo grupo", error.message)
      }
      Alert.alert("Novo grupo", "Não foi possível cadastrar o grupo. Por favor tente novamente.")
      console.log(error)
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova Turma" subtitle="crie uma turma para adicionar pessoas" />
        <Input
          placeholder="Nome da turma"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Button 
          style={{marginTop: 20}}
          title="Criar"
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  )
}