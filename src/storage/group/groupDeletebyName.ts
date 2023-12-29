import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from './groupsGetAll'
import { AppError } from "@utils/AppError";
import {GROUP_COLECTION, PLAYER_COLLECTION} from '@storage/storageConfig'

export async function groupDeletebyName(deletedGroupName: string) {
  try {
    const storedGroups = await groupsGetAll()

    if(!storedGroups.some(group => group === deletedGroupName)) {
      throw new AppError("Não existe um grupo cadastrado com este nome.")
    }

    const filteredGroups = storedGroups.filter(group => group !== deletedGroupName)
    const newStorage = JSON.stringify(filteredGroups)

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${deletedGroupName}`)
    await AsyncStorage.setItem(GROUP_COLECTION, newStorage)
  }catch(error) {
    throw error
  }
}