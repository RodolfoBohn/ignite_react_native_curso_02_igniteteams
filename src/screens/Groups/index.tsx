import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Wrapper } from './styles';
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera de PTC', 'Pessoal da Starpex'])
  const navigation = useNavigation()

  function hadleNewGroup() {
    navigation.navigate('new')
  }

  function handleClickGroup(group: string) {
    navigation.navigate('players', {group})
  }

  async function fetchLocalGroups() {
    try {
      const groups = await groupsGetAll()
      setGroups(groups)
    }catch(error) {
      console.log(error)
    }
  }


  useFocusEffect(useCallback(() => {
    fetchLocalGroups()
  }, []))

  return (
    <Wrapper>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item} 
            onPress={() => handleClickGroup(item)}
          />
        )}
        ListEmptyComponent={() => <EmptyList message='Que tal cadastrar a primeira turma?' />}
        contentContainerStyle={groups.length === 0 ? {flex: 1} : {gap: 12}}
      />

      <Button 
        title='Criar nova turma'
        onPress={hadleNewGroup}
      />
    </Wrapper>
  );
}

