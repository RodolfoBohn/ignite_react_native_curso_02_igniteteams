import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string) {
  try{

    const storageGroups = await groupsGetAll()

    if(storageGroups.includes(newGroup)) {
      throw new AppError(`Já existe um grupo cadastrado com o nome ${newGroup}`)
    }

    const newStorage = JSON.stringify([...storageGroups, newGroup])
    
    await AsyncStorage.setItem(GROUP_COLECTION, newStorage)
  } catch(error) {
    throw error
  }
}