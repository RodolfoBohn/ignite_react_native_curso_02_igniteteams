import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetAllByGroup } from './playersGetAllByGroup';

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {

    const storagePlayers = await playersGetAllByGroup(group)

    if(storagePlayers.some(player => player.name === newPlayer.name)) {
      throw new AppError("Já existe um jogador cadastrado com o mesmo nome neste grupo.")
    }

    const newStorage = JSON.stringify([...storagePlayers, newPlayer])
    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newStorage)
  } catch (error) {
    throw error;
  }
}