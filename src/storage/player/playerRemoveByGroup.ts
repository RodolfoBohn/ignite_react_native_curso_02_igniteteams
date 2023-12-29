import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetAllByGroup } from './playersGetAllByGroup';

export async function playerDeletedByGroup(deletedPlayer: PlayerStorageDTO, group: string) {
  try {

    const storagePlayers = await playersGetAllByGroup(group)

    if(!storagePlayers.some(player => player.name === deletedPlayer.name)) {
      throw new AppError("Não existe um jogador cadastrado com este nome para este grupo.")
    }

    const filteredStoragePlayers = storagePlayers.filter(player => player.name !== deletedPlayer.name)

    const newStorage = JSON.stringify(filteredStoragePlayers)
    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newStorage)
  } catch (error) {
    throw error;
  }
}