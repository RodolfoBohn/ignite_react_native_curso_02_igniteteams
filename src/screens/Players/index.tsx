import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/FIlter";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";

import { Container, Form, HeaderList, TeamMembersCounter } from "./styles";

import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetAllByGroupAndTeam } from "@storage/player/playersGetAllByGroupAndTeam";
import { playerDeletedByGroup } from "@storage/player/playerRemoveByGroup";
import { Button } from "@components/Button";
import { groupDeletebyName } from "@storage/group/groupDeletebyName";

interface RouterParams {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [activeTeam, setActiveTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const newPlayerInputRef = useRef<TextInput>(null)
  const router = useRoute()
  const navigator = useNavigation()
  const {group} = router.params as RouterParams

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert("Novo jogador", "Digite o nome do jogador para cadastra-lo.")
    }

    try {
      const newPlayer: PlayerStorageDTO = {
        name: newPlayerName, 
        team: activeTeam
      }

      await playerAddByGroup(newPlayer, group)
      setNewPlayerName('')
      newPlayerInputRef.current?.blur()

      fetchPlayersByTeam()
    }catch(error) {
      if(error instanceof AppError) {
        return Alert.alert("Novo jogador", error.message)
      }
      console.log(error)
      Alert.alert("Novo jogador", "Não foi possível cadastrar o jogador. Por favor tente novamente.")
    }
  }

  async function handleDeletePlayer(deletedPlayer:PlayerStorageDTO) {
    try {
      await playerDeletedByGroup(deletedPlayer, group)
      fetchPlayersByTeam()
    }catch(error) {
      if(error instanceof AppError) {
        return Alert.alert("Deletar jogador", error.message)
      }
      console.log(error)
      Alert.alert("Deletar jogador", "Não foi possível deletar o jogador. Por favor tente novamente.")
    }
  }

  async function handleRemoveGroup() {
    try {
      await groupDeletebyName(group)
      return Alert.alert("Deletar turma", "Turma deletada com sucesso", [{
        text: "Ok", 
        onPress:() => navigator.navigate("groups")
      }])
    }catch(error) {
      if(error instanceof AppError) {
        return Alert.alert("Deletar turma", error.message)
      }
      console.log(error)
      Alert.alert("Deletar turma", "Não foi possível deletar a turma. Por favor tente novamente.")
    }
  }

  async function handleClickRemoveGroup() {
    return Alert.alert("Remover turma", "Você tem certeza que deseja remover a turma?", [
      {
      text: 'Sim', 
      style:"destructive", 
      onPress: () => handleRemoveGroup()
      }, 
      {
        text: "Não", 
        style: "cancel", 
      }
    ])
  }


  async function fetchPlayersByTeam() {
    try {const playersByGroupAndTeam = await playersGetAllByGroupAndTeam(group, activeTeam)
    setPlayers(playersByGroupAndTeam)
    } catch(error) {
      console.log(error)
      Alert.alert("Jogadores", "Não foi possível carregar os jogadores deste time. Por favor tente novamente.")
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [activeTeam])

  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title={group} 
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          inputRef={newPlayerInputRef}
          placeholder="Nome do participante"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon 
          name="add" 
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter 
              title={item} 
              isActive ={activeTeam === item}
              onPress={() => setActiveTeam(item)}
            />
          )}
          horizontal
        />
        <TeamMembersCounter>
          {players.length}
        </TeamMembersCounter>
      </HeaderList>

      <FlatList 
        data={players}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={players.length === 0 ? {flex: 1} : {gap: 16, paddingBottom: 100}}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard 
            name={item.name}
            onRemove={() => handleDeletePlayer(item)}
          />
        )}

        ListEmptyComponent={() => (
          <EmptyList message="Não há pessoas nesse time." />
        )}

      />
      <Button
        title="Remover turma" 
        variant="SECONDARY"
        onPress={handleClickRemoveGroup}
      />
    </Container>
  )
}