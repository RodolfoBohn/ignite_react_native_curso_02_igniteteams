import AsyncStorage from "@react-native-async-storage/async-storage"
import { PLAYER_COLLECTION } from "@storage/storageConfig"
import { PlayerStorageDTO } from "./PlayerStorageDTO"

export async function playersGetAllByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

    const playersByGroup = storage ? JSON.parse(storage) as PlayerStorageDTO[] : []

    return playersByGroup
  }catch(error) {
    throw error
  }
}